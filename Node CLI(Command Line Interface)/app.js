  
import ora from "ora";
import enquirer from 'enquirer';
import boxen from "boxen";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage('./scratch');
import chalk from "chalk";
import {
  getArticleText,
  getHeadlines,
  getPageContents,
  getSports,
} from "@rwxdev/espn";

const homepageUrl = "https://espn.com/";

const showTodaysUsage = () => {
  const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const now = new Date();
  const dateString = now.toLocaleString('en-US', dateOptions);
  const todaysRuns = parseInt(localStorage.getItem(dateString)) || 0;
  const chalkColor = todaysRuns < 5 ? "green" : todaysRuns > 10 ? "red" : "yellow";
  console.log(chalk[chalkColor](`Times you've checked ESPN today: ${todaysRuns}`));
  localStorage.setItem(dateString, todaysRuns + 1);
}

const runCli = async () => {
  showTodaysUsage();
  console.log("Thanks for consuming sports headlines responsibly!");
  const spinner = ora("Getting headlines...").start();
  const $homepage = await getPageContents(homepageUrl);

  spinner.succeed("ESPN headlines received");
  const homepageHeadlines = getHeadlines($homepage);
  const sports = getSports($homepage);
  const headlinesBySport = {};
  for (let sport of sports) {
    getPageContents(sport.href).then(($sportPage) => {
      const headlines = getHeadlines($sportPage);
      headlinesBySport[sport.title] = headlines;
    }).catch((e) => {
      console.log("there was an issue getting headlines for a certain sport", e);
    });
  }

  const selectionTypes = {
    HEADLINE: "headline",
    SPORT: "sport",
    MORE: "more"
  };
  const genericOptions = {
    HOMEPAGE_HEADLINES: { title: "see homepage headlines" },
    LIST_SPORTS: { title: "see headlines for specific sports", type: selectionTypes.MORE },
    OTHER_SPORTS: { title: "see headlines for other sports", type: selectionTypes.MORE },
    EXIT: { title: "exit" },
  };

  let selection;
  let selectionTitle;
  let articleText;
  let currentPrompt;
  let exit = false;
  while(!exit) {
    currentPrompt?.clear();
    if (!selection || selection.title === genericOptions.HOMEPAGE_HEADLINES.title) {
      currentPrompt = new enquirer.Select({
        name: 'homepage',
        message: 'What story shall we read?',
        choices: [...homepageHeadlines.map(item => item.title), genericOptions.LIST_SPORTS.title, genericOptions.EXIT.title]
      });
    }
    else if (selection.type === selectionTypes.MORE) {
      currentPrompt = new enquirer.Select({
        name: 'sports',
        message: 'Which sport would you like headlines for?',
        choices: sports.map(choice => choice.title)
      });
    }
    else if (selection.type === selectionTypes.SPORT) {
      const sportHeadlines = headlinesBySport[selection.title];
      const sportChoices = sportHeadlines.map(option => option.title);
      currentPrompt = new enquirer.Select({
        name: 'sportHeadlines',
        message: `Select a ${selection.title} headline to get article text`,
        choices: [...sportChoices, genericOptions.HOMEPAGE_HEADLINES.title, genericOptions.OTHER_SPORTS.title, genericOptions.EXIT.title]
      });
    }
    else if (selection.type === selectionTypes.HEADLINE) {
      articleText = await getArticleText(selection.href);
      console.log(boxen(selection.href, { borderStyle: 'bold'}));
      console.log(boxen(articleText, { borderStyle: 'singleDouble'}));
      currentPrompt = new enquirer.Select({
        name: 'article',
        message: 'Done reading? What next?',
        choices: [genericOptions.HOMEPAGE_HEADLINES.title, genericOptions.LIST_SPORTS.title, genericOptions.EXIT.title]
      });
      articleText = "";
    }
    else {
      exit = true;
      break;
    }

    selectionTitle = await currentPrompt.run();
    const combinedSportHeadlines = Object.values(headlinesBySport).reduce((accumulator, item) => {
      return [...accumulator, ...item];
    }, [])
    const allOptions = [...Object.values(genericOptions), ...homepageHeadlines, ...sports, ...combinedSportHeadlines];
    selection = allOptions.find(item => item.title === selectionTitle);
  }
  console.log("Thanks for using the ESPN cli!");
  return;
}

runCli();