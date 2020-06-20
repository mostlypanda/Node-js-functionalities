const express=require('express');
const mongooses= require('mongoose');

var app=express();

app.get('/',function(req,res){
    res.status(200).send(`hyy`);
})

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})