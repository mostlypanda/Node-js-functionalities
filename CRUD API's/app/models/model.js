const mongoose=require('mongoose');

//defining schema
const noteSchema=mongoose.Schema({
    title:{
        type: String,
    },
    author:{
        type: String,
    },
    content:{
        type : String,
    }
},{
    timestamps: true
});

module.exports=mongoose.model('Note',noteSchema);
