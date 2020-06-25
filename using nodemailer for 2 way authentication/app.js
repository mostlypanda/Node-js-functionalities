const express=require('express');
const bodyparser=require('body-parser');
const nodemailer=require('nodemailer');
const path=require('path');
const exphbs=require('express-handlebars');


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

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

app.post('/send',function(req,res){
    const output= `
    <h1> You have a new contact request</h1>
    <h3>COntact Details</h3>
    <ul>
    <li> Firstname: ${req.body.firstname}</li>
    <li> Lastname: ${req.body.lastname}</li>
    <li> email: ${req.body.email}</li>
    <li> phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>

    `;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service : 'Gmail',
        
        auth: {
          user: 'YOUR MAIL',
          pass: 'MAIL PASSWORD',
        }
        
      });
        
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

app.post('/sendotp',function(req,res){
    if(req.body.otp==otp){
        res.send("welcome");
    }
    else{
        res.render('otp',{msg : 'otp is incorrect'});
    }
})    

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})
