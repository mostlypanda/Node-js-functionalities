const Note=require('../models/model');

// create and save a new note
exports.create=function(req,res){
    
    if(!req.body.title||!req.body.author||!req.body.content) {
        return res.status(400).send({
            message: "Every field is required"
        });
    }

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
            res.status(404).json({"message" : "Some error occurred while creating the Note"});
        });

    });
};


// to find all the notes
exports.findAll=function(req,res){
    Note.find()
    .then(notes=>{
        res.status(200).send(notes);
    }).catch(err=>{
        res.status(404).json({"message": "Some error occurred while retrieving notes."});
    });
};

// find a note by id
exports.findone=function(req,res){
    
    Note.findById(req.params.noteId)
    .then(note=>{
        if(!note){
            return res.status(404).send({message:"Note not found with id " + req.params.noteId});
        }
        res.status(200).send(note);
    }).catch(err=>{
        if(err.kind=='ObjectId'){
            return res.status(404).send({ message: "Note not found with id " + req.params.noteId });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });

};

//request to find ny the name of author
exports.findbyauthor=function(req,res){
    Note.find({author:req.params.author},function(err,note){
        if(!note) return res.status(404).send({message:"not found"});
        else{
        return res.status(200).send(note);
        }
    });
};

// request to find by the name of title of note
exports.findbytitle=function(req,res){
    Note.find({title:req.params.title},function(err,note){
        if(note) return res.status(200).send(note);
        
        res.status(404).send({message : "No note with given title name has been found"});
       
    });
};

//update any note with given id
exports.update=function(req,res){
    
    if(!req.body.content){
        return res.status(400).send({message :"Note content can not be empty"})
    }
    
    Note.findByIdAndUpdate(req.params.noteId,{
        title : req.body.title,
        author : req.body.author,
        content : req.body.content
    },{new: true})
    .then(note=>{
        if(!note){
            return res.status(404).send({message: "note not found with id "+req.params.noteId});
        }
        res.status(200).send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });


};

//to delete any note by id
exports.delete=function(req,res){
    Note.findByIdAndDelete(req.params.noteId)
    .then(note=>{
        if(!note){
            return res.status(404).send({message :"Note not found with id"+req.params.noteId});
        }
        res.send({message : "note deleted successfully"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};