const express=require('express');
const mongooses= require('mongoose');
const User=require('./models/user');
const db=require('./mysetup/myurl').myurl;
const bodyparser=require('body-parser');

var app=express();
// app use
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

// database connection
mongooses.connect(db).then(()=>{
    console.log('databse is connected');
}).catch(err=>{
    console.log("err is", err.message);
})



app.get('/',function(req,res){
    res.status(200).send(`hyy`);
})

// listening port
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})