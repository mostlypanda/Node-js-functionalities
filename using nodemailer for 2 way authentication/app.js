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

    `;
});

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})