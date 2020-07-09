const express=require('express');
const mongooses= require('mongoose');
const bodyparser=require('body-parser');
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const User=require('./models/user');
const {auth} =require('./middlewares/auth');
const db=require('./mysetup/myurl').myurl;
const passport=require('passport');
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

app.post('/api/signup',function(req,res){
   // taking a user
    var newUser=new User({
        name:req.body.name,
        email: req.body.email,
        password: req.body.password,
        password2:req.body.password
    });
    if(password!=password2)
    return res.status(400).json({message: "passwords don't match"});
  
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
app.post('/api/login', function(req,res){
    var newUser={};
    newUser.email=req.body.email;
    newUser.password=req.body.password

    User.findOne({email: newUser.email},function(err,user){
        // user not found
        if(!user) res.status(400).json({isAuth: false, message :'User doesnt exists'});
        
        //comparing password
        bcrypt.compare(newUser.password, user.password, function(err,result){
             if(err) console.log('error is ', err.message);
             else if(result==true){
                 // passowrd matched
                 //token genearated
                    user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.cookie('auth',user.token).json({
                        isAuth : true,
                        id : user._id,
                        email : user.email
                    })
                });
             }
             else{
                 //password does not match
                res.status(400).json({isAuth : false, message: 'Password is incorrect'});
             }
         });

            
    }).catch(err=>{
        console.log('error is ', err.message);
    });
});

// profile
app.get('/api/profile',auth,function(req,res){
    res.status(200).json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email
    });
});

//logout a user
app.get('/api/logout',auth,function(req,res){
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });
})



app.get('/',function(req,res){
    res.status(200).send(`Welcome to login , sign-up api`);
})

// listening port
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})