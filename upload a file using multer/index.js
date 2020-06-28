const express=require('express');
const bodyparser=require('body-parser');
const path=require('path');
const multer=require('multer');
const ejs=require('ejs');


//defining storage
var storage=multer.diskStorage({
    destination :'./public/uploads',
    filename: function(req,file,cb){
        cb(null,file.fieldname+ '-'+ Date.now() + path.extname(file.originalname));
    }
});
const upload =multer({
    storage : storage,
    limits : {fileSize : 10000000},
    fileFilter : function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('myImage');


function checkFileType(file,cb){
    //allowed ext
    const filetypes =/jpeg|jpg|png|gif/;
    // check ext
    const extname= filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype =filetypes.test(file.mimetype);
    
    if(mimetype && extname){
        return cb(null,true)
    }
    else{
        cb('Error : Images only!');
    }
}

//app
const app=express();

//set engine
app.set('view engine', 'ejs');

//using json
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));

//set static directory
app.use('/public',express.static(path.join(__dirname + 'public')));

//basic route
app.get('/',function(req,res){
    res.render('index',{msg : ''});
})

//upload an image
app.post('/api/upload',function(req,res){
    upload(req,res,function(err){
        if(err){
            res.render('index',{msg : err});
        }
        else{
            if(req.file==undefined){
                res.render('index',{msg :'error : no file selected'});
            }
            else{
                res.render('index',{
                    msg: 'file uploaded',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
        
    });
});

//port is live
const port=3000|| process.env.PORT;
app.listen(port,function(res,err){
    console.log(`app is live at ${port}`);
})
