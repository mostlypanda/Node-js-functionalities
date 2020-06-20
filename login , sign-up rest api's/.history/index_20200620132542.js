const express=require('express');
const mongooses= require('mongoose');

var app=express();

app.get('/',function(req,res){
    
})

const PORT=process.env.PORT||3000;
app.length(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})