const express=require('express');
const mongooses= require('mongoose');
const bodyparser=require('body-parser');
const bcrypt=require('bcrypt');
const User=require('./models/user');
const db=require('./mysetup/myurl').myurl;
var saltRouds = 10;

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

// adding new user (sign-up route)

app.post('/signup',function(req,res){
   // taking a user
    var newUser=new User({
        email: req.body.email,
        password: req.body.password
    });
  
   // checking whether user is already registered or not
    User.findOne({email: newUser.email},function(err,user){
        if(user) return res.status(400).json({isAuth: false, message: 'user already exist'});

        //hasing the passwords
        bcrypt.hash(newUser.password,saltRouds, function(err,hash){
            if(err) console.log('error is ', err.message);
            else{
                newUser.password=hash;
                
            //saving in the database
                newUser.save().then(()=>{
                res.status(200).send(newUser);
                }).catch(err=>{
                console.log("error is ", err.message);
                });
            }
        });
    });
      //console.log(newUser.email,newUser.password);

     
   
});

app.get('/',function(req,res){
    res.status(200).send(`hyy`);
})

// listening port
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})