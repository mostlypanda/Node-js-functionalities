const express=require('express');
const bodyparser=require('body-parser');
const nodemailer=require('nodemailer');
const path=require('path');
const exphbs=require('express-handlebars');
const async = require('async');

// initialize redis
const redis = require("redis");
const client = redis.createClient({
    host: 'localhost',
    port: 6379
});
 
client.on("error", function(error) {
  console.error(error);
});


const app=express();

// view engine setup
app.engine('handlebars',exphbs({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ "}));
app.set('view engine','handlebars');

// body parser middleware
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

//static folder
app.use('/public',express.static(path.join(__dirname, 'public')));


app.get('/',function(req,res){
    res.render('contact');
});

var email;

// var otp = Math.random();
// otp = otp * 1000000;
// otp = parseInt(otp);
// console.log(otp);

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: 'xxxxxxxxxxxxxxx',
      pass: 'xxxxxxxxxxxxxxx',
    }
    
});
    
app.post('/send',function(req,res){
    email=req.body.email;
    
    // generate the otp
    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    console.log(otp);

    // set otp in redis (with email as key) with expiration time(5 mins)
    client.setex(req.body.email, 3000000, otp);


     // send mail with defined transport object
    var mailOptions={
       to: req.body.email,
       subject: "Otp for registration is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('otp');
    });
});

app.post('/verify',function(req,res){

    // check if otp exists in redis (else send message otp expired)
    client.keys('*', (err, keys) => {
        if (err) res.render('otp',{msg : 'An error occurred!'});
        if(keys){
            console.log(keys.length);
            
            let flag = 0;
            for(let i = 0; i<keys.length; i++){
                client.get(keys[i], (err, value) => {

                    if (err) res.render('otp',{msg : 'An error occurred!'});

                    if(value === req.body.otp){
                        flag = 1;
                        res.send("You have been successfully registered");
                    }
                });
            }

            if(flag === 0)
                res.render('otp',{msg : 'Incorrect OTP!'});

            // async.map(keys, (key, cb) => {
            //    client.get(key, (error, value) => {
                    
            //         if (error) return cb(error);

            //         if(value === req.body.otp)
            //             res.send("You have been successfully registered");
            //         // var job = {};
            //         // job['jobId']=key;
            //         // job['data']=value;
            //         // cb(null, job);
            //     }); 
            // }, (error, results) => {
            //    if (error) res.render('otp',{msg : 'Incorrect OTP!'});
            // //    console.log(results);
            // //    res.json({data:results});
            // });
        }else{
            res.render('otp',{msg : 'Error fetchin OTP!'});
        }
    });
    // if(req.body.otp==otp){
    //     res.send("You has been successfully registered");
    // }
    // else{
    //     res.render('otp',{msg : 'otp is incorrect'});
    // }
});  

// app.post('/resend',function(req,res){

//     // generate a new otp, save it in redis and then send it

//      // generate the otp
//      var otp = Math.random();
//      otp = otp * 1000000;
//      otp = parseInt(otp);
//      console.log(otp);
 
//      // set otp in redis (with email as key) with expiration time(5 mins)
//      client.setex(req.body.email, 3000000, otp);
 
 
//     var mailOptions={
//         to: email,
//        subject: "Otp for registration is: ",
//        html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
//      };
     
//      transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);   
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//         res.render('otp',{msg:"otp has been sent"});
//     });

// });

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})
