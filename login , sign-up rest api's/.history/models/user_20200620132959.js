var mongoose=require('mongoose');
const UserSchema= mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require: true
    }
})