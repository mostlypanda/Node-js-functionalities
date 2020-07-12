const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const multer=require('multer');
const user=require('./model');
const app=express();

var storage=multer.diskStorage({
  destination:(req,file,path)=>
  {path(null,'public/images')},

  filename:(req,file,path)=>{
  path(null,file.originalname)}
  
});

var upload=multer({storage:storage})
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

mongoose.Promise=global.Promise;
mongoose.connect('mongodb+srv://test:test@cluster0-bi1rv.mongodb.net/test?retryWrites=true&w=majority',
                {useNewUrlParser: true,useUnifiedTopology: true },function(err){
                  if(err) console.log(err);
                  console.log("connected to db");
                });

app.post('/register',upload.any('file'),function(req,res){
  const newuser=new user(req.body);
  newuser.save(function(err,doc){
    if(err)
    console.log(err);
    res.send(doc);
  });
})

app.listen(3000,()=>{
  console.log('app is live at 3000');
});