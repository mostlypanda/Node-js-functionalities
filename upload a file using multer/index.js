const express=require('express');
const bodyparser=require('body-parser');
const path=require('path');
const multer=require('multer');
const ejs=require('ejs');

//defining storage
var storage=multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads');
    },
    filename: function(req,file,cb){
        cb(null,file.filename+ '-'+ Date.now());
    }
});

var upload=multer({storage : storage}).single('userPhoto');


const app=express();

//set engine
app.set('view engine', 'ejs');

//using json
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));

//set static directory
app.use('/public',express.static(path.join(__dirname + 'public')));


app.get('/',function(req,res){
    res.send('hy');
})

app.post('/api/upload',function(req,res){
    upload(req,res,function(err){
        if(err){
            res.status(400).end('error');
        }
        res.status(200).end('file uploaded');
    })
});

//port is live
const port=3000|| process.env.PORT;
app.listen(port,function(res,err){
    console.log(`app is live at ${port}`);
})
