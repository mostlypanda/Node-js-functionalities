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

        newnote.save(function(err,doc){
            if(err) return res.status(400).json(err);
            res.status(201).json({
                post : true,
                note : doc
            });
        });
    });
};


// to find all the notes
exports.findAll=function(req,res){
    Note.find(function(err,doc){
        if(err) return res.status(400).send(err);
        res.status(200).json(doc);
    })
};

// find a note by id
exports.findone=function(req,res){
    
    Note.findById(req.params.noteId,function(err,doc){
        if(err) return res.status(400).send(err);

        res.status(200),json(doc);
    })
    

};

//request to find ny the name of author
exports.findbyauthor=function(req,res){
    Note.find({author:req.params.author},function(err,note){
        if(err) return res.status(400).send(err); 
        
        if(!note) return res.status(404).send({message:"not found"});
    
        res.status(200).json(note);
        
    });
};

// request to find by the name of title of note
exports.findbytitle=function(req,res){
    Note.find({title:req.params.title},function(err,note){
        if(err) return res.status(400).send(err); 
        
        if(!note) return res.status(404).send({message:"not found"});
    
        res.status(200).json(note);  
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
    },{new: true},function(err,doc){
        if(err) return res.status(400).send(err);
        
        if(!doc) return res.status(404).json({message : "No note with this id has been found"});

        res.status(200).json({
            update : true,
            note : doc
        })
    })
    
};

//to delete any note by id
exports.delete=function(req,res){
    Note.findByIdAndDelete(req.params.noteId,function(err,doc){
        if(err) return res.status(400).send(err);

        if(!doc) return res.status(404).json({message : "NOt found"});

        res.status(200).json({
            delete : true,
            note : doc
        });
    })
    
};