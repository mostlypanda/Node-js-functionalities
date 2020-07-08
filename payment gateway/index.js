const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const url=require('./config/mongoose');
const pug=require('pug');
const path=require('path');
const _=require('lodash');
const donor=require('./models/model');
const { request } = require('express');
const {initializepayment, verifypayment}=require('./config/paystack')(request);

const app=express();

app.set('view engine','pug');
app.use(express.static(path.join(__dirname+'/public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

mongoose.Promise=global.Promise;
mongoose.connect(url.url,{useNewUrlParser: true,useUnifiedTopology: true },function(err){
    if(err) console.log(err);
    console.log("database is connected");
});

app.get('/',function(req,res){
    res.render('index.pug');
})

app.post('/paystack/pay',function(req,res){
    const form=_.pick(req.body,['amount','email','name']);
    form.metadata={
        name : form.name
    }
    form.amount*=100;
    initializepayment(form,(error,body)=>{
        if(error) {
            console.log(error);
            return;
        }
        response=JSON.parse(body);
        res.redirect(response.data.authorization_url);
    });
});


const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`app is live at ${port}`);
});