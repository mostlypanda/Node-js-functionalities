const express = require("express");
const bodyParser = require("body-parser");
const multer=require('multer');
const mongoose = require("mongoose");
const taskController = require("./controllers/TaskController");

// db instance connection
const app = express();
const port = process.env.PORT || 3301;

var storage=multer.diskStorage({
  destination:(req,file,path)=>
  {path(null,'public/images')},

  filename:(req,file,path)=>{
  path(null,file.originalname)}
  
});

var upload=multer({storage:storage})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./config/db");

// API ENDPOINTS

app
  .route("/tasks")
  .post(taskController.createNewTask);

app
  .route("/tasks/:taskid")
  .put(taskController.updateTask)

  
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});