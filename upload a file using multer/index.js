const express=require('express');
const bodyparser=require('body-parser');
const path=require('path');
const multer=require('multer');
const exphbs=require('express-handlebars');

//defining storage
var storage=multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads');
    },
    filename: function(req,file,cb){
        cb(null,file.filename+ '-'+ Date.now());
    }
})


const app=express();

//set engine
app.engine('handlebars',exphbs({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ "}));
app.set('view engine', 'handlebars');

//using json
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));

//set static directory
app.use('/public',express.static(path.join(__dirname + 'public')));


app.get('/',function(req,res){
    res.status(400).json({msg: "hyyy"});
})

//port is live
const port=3000|| process.env.PORT;
app.listen(port,function(res,err){
    console.log(`app is live at ${port}`);
})
