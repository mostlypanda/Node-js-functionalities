var mongoose=require('mongoose');
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const config =require('./../config/config').get(process.env.NODE_ENV);
const UserSchema= mongoose.Schema({
    email:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require: true
    }
});
UserSchema.methods.generateToken =function(cb){
    var user =this;
    var token = jwt.sign(user._id.toHexString(),config.SECRET);
    
    user.token =token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}


UserSchema.statics.findByToken = function(token,cb){
    var user =this;
    jwt.verify(token ,config.SECRET,function(err,decode){
        user.findOne({"_id": decode,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user)
        })
    });
}

UserSchema.methods.deleteToken = function(token , cb){
    var user =this;

    user.update({$unset:{token:1}},(err,user)=>{
        if(err) return cb(err);
        cb(null,user);
    })
}
module.exports=User=mongoose.model('UserSchema', UserSchema);