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
});

// login user
app.post('/login', function(req,res){
    var newUser={};
    newUser.email=req.body.email;
    newUser.password=req.body.password

    User.findOne({email: newUser.email},function(err,user){
        if(!user) res.status(400).json({isAuth: false, message :'User doesnt exists'});
         bcrypt.compare(newUser.password, user.password, function(err,result){
             if(err) console.log('error is ', err.message);
             else if(result==true){
                 res.status(200).json({isAuth : true, message: 'User authenticated'});
             }
             else{
                res.status(400).json({isAuth : false, message: 'Password is incorrect'});
             }
         })
    }).catch(err=>{
        console.log('error is ', err.message);
    });
});

app.get('/',function(req,res){
    res.status(200).send(`hyy`);
})

// listening port
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})