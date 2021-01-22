const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Username: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Tasks", TaskSchema);