const { request } = require("express");

const mongoose=require('mongoose');

const fileschema=mongoose.Schema({
    name:{
        type: String,
        required: true
    }
});

module.exports=mongoose.model('file', fileschema);