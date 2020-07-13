const axios=require('axios');
const cheerio=require('cheerio');
const express=require('express');
const app=express();

const url="http://news.ycombinator.com";

let getData = html => {
    data = [];
    const $ = cheerio.load(html);
    $('table.itemlist tr td:nth-child(3)').each((i, elem) => {
      data.push({
        title : $(elem).text(),
        link : $(elem).find('a.storylink').attr('href')
      });
    });
    return data;
  }

app.get('/',function(req,res){
    axios.get(url)
    .then(resp=>{
        let html=resp.data;
        console.log(getData(html));
        res.send(getData(html));
    }).catch(err=>{
        console.log(err);
    });

})


app.listen(3000,()=>{
    console.log("app is live");
})    