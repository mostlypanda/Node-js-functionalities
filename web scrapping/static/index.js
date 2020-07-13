const axios=require('axios');
const cheerio=require('cheerio');

const url="http://news.ycombinator.com";

axios.get(url)
    .then(res=>{
        console.log(res.data);
    }).catch(err=>{
        console.log(err);
    })