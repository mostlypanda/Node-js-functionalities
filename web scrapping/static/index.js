const axios=require('axios');
const cheerio=require('cheerio');
const express=require('express');
const app=express();

const url="http://news.ycombinator.com";

app.get('/',function(req,res){
    axios.get(url)
    .then(resp=>{
        console.log(resp.data);
        res.send(resp.data);
    }).catch(err=>{
        console.log(err);
    });

})


app.listen(3000,()=>{
    console.log("app is live");
})    