const axios=require('axios');
const cheerio=require('cheerio');
const express=require('express');
const app=express();

const url="http://news.ycombinator.com";


axios.get(url)
    .then(res=>{
        console.log(res.data);
    }).catch(err=>{
        console.log(err);
    });


app.listen(3000,()=>{
    console.log("app is live");
})    