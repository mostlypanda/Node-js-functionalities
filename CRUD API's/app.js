const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const dburl=require('./database/myurl.js');

//create express app
const app=express();

//parse application/ x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended : false}));
//parse application json
app.use(bodyparser.json());

//connect the database
mongoose.Promise=global.Promise;

mongoose.connect(dburl.url,{
    useNewUrlParser: true
}).then(()=>{
    console.log("database is connected");
}).catch((err)=>{
    console.log("could not connect to the database");
    process.exit();
})


app.get('/',function(req,res){
    res.json({"message": "welcome to crud api's"});
});

require('./app/routes/routes')(app);


const PORT=3000||process.env.PORT;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});