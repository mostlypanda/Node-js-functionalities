const { request } = require("express");

const mongoose=require('mongoose');

const userschema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required : true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('user', userschema);