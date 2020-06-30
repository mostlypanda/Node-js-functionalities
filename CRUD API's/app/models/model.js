const mongoose=require('mongoose');

//defining schema
const noteSchema=mongoose.Schema({
    title:{
        type: string,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    content:{
        type : string,
        require: true
    }
},
{
    timestamp: true
});

module.exports=mongoose.model('Note',noteSchema);