const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const url=require('./config/mongoose');
const pug=require('pug');
const path=require('path');
const _=require('lodash');
const donor=require('./models/model');
const { request } = require('express');
const {initializePayment, verifyPayment}=require('./config/paystack')(request);

const app=express();

app.set('view engine','pug');
app.use(express.static(path.join(__dirname+'/public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

mongoose.Promise=global.Promise;
mongoose.connect(url.url,{useNewUrlParser: true,useUnifiedTopology: true },function(err){
    if(err) console.log(err);
    console.log("database is connected");
});

app.get('/',function(req,res){
    res.render('index.pug');
})

app.post('/paystack/pay',function(req,res){
    const form=_.pick(req.body,['amount','email','full_name']);
    form.metadata={
        full_name : form.full_name
    }
    form.amount*=100;
    initializePayment(form,(error,body)=>{
        if(error) {
            console.log(error);
            return;
        }
        response=JSON.parse(body);
        res.redirect(response.data.authorization_url);
    });
});

app.get('/paystack/callback', (req,res) => {
    const ref = req.query.reference;
    verifyPayment(ref, (error,body)=>{
        if(error){
            //handle errors appropriately
            console.log(error)
            return res.redirect('/error');
        }
        response = JSON.parse(body);
        const data = _.at(response.data, ['reference', 'amount','customer.email', 'metadata.full_name']);
        [reference, amount, email, full_name] =  data;
        newDonor = {reference, amount, email, full_name}
        const donor = new Donor(newDonor)
        donor.save().then((donor)=>{
            if(!donor){
                res.redirect('/error');
            }
            res.redirect('/receipt/'+donor._id);
        }).catch((e)=>{
            res.redirect('/error');
       });
    });
});
app.get('/receipt/:id', (req, res)=>{
    const id = req.params.id;
    Donor.findById(id).then((donor)=>{
        if(!donor){
            //handle error when the donor is not found
            res.redirect('/error')
        }
        res.render('success.pug',{donor});
    }).catch((e)=>{
        res.redirect('/error')
    });
});
const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`app is live at ${port}`);
});