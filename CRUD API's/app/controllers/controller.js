const Note=require('../models/model');

// create and save a new note
exports.create=function(req,res){
    const newnote=Note({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    });
    

    Note.findOne({title: newnote.title},function(err,note){
        if(note)return res.status(400).json({message: "same title exists"});

        newnote.save()
        .then(data=> {res.status(200).send(data)})
        .catch(err=>{
            res.status(400).json({"message" : "Some error occurred while creating the Note"});
        });

    });
};


// to find all the notes
exports.findAll=function(req,res){
    Note.find()
    .then(notes=>{
        res.status(200).send(notes);
    }).catch(err=>{
        res.status(400).json({"message": "Some error occurred while retrieving notes."});
    });
};

// find a note by id
exports.findone=function(req,res){
    

};

exports.update=function(req,res){

};

exports.delete=function(req,res){

};