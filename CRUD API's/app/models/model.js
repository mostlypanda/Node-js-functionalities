const mongoose=require('mongoose');

//defining schema
const noteSchema=mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    content:{
        type : String,
        require: true
    }
},{
    timestamps: true
});

module.exports=mongoose.model('Note',noteSchema);