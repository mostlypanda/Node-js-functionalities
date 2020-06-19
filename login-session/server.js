const express=require('express');
const session=require('express-session');
const bodyparser=require('body-parser');
const router=express.Router();
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();

const app=express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
    saveUninitialized: false,
    resave: false
}));


// for rendering the home page
router.get('/',function(req,res){
     let sess=req.session;
    if(sess.email){
        return res.redirect('/admin');
    }
    res.sendFile('index.html');
});

//login route
router.post('/login',function(req,res){
    req.session.email = req.body.email;
    res.end('done');
});

//admin route after login
router.get('/admin',function(req,res){
   if(req.session.email) {
        res.write(`<h1>Hello ${req.session.email} </h1><br>`);
        res.end('<a href='+'/logout'+'>Logout</a>');
    }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
});

//to destroy sesssion
router.get('/logout', function(req,res){
    req.session.destroy((err)=>{
        if(err){
            return console.log(err);
        }
        res.redirect('/');
    })
})
app.use('/',router);


app.listen(process.env.PORT||3000,()=>{
    console.log('app is live at 3000');
});
