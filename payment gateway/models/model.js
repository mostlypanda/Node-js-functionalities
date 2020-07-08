const mongoose=require('mongoose');

const donorschema=mongoose.Schema({
    full_name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    amount:{
        type :String,
        required : true
    },
    reference:{
        type : String,
        required : true
    }
});

module.exports=mongoose.model('donor',donorschema);