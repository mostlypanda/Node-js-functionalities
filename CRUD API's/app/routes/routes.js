module.exports=(app)=>{
    const notes=require('../controllers/controller');

    //create a new note
    app.post('/api/create',notes.create);
    
    //retrive all notes
    app.get('/api/notes',notes.findAll);

    //retrive a single note by id
    app.get('/api/notes/:noteId',notes.findone);

    //update a note with noteId
    app.put('/api/notes/:noteId',notes.update);

    //delete a Note with noteId
    app.delete('/api/notes/:noteId',notes.delete);
}