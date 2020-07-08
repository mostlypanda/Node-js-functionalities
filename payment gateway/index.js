const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const url=require('./config/mongoose');
const pug=require('pug');
const path=require('path');

const app=express();

app.set('view engine','pug');
app.use(express.static(path.join(__dirname+'/public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

mongoose.Promise=global.Promise;
mongoose.connect(url.url,{useNewUrlParser: true,useUnifiedTopology: true },function(err){
    if(err) console.log(err);
    console.log("database is connected");
})


const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`app is live at ${port}`);
});