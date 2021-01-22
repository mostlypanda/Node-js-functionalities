const mongoose = require("mongoose");

const dbURI = "mongodb+srv://iamparasbansal:bansal123@cluster1.q67i1.mongodb.net/<dbname>?retryWrites=true&w=majority";

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    poolSize: 10
};

mongoose.Promise=global.Promise;
mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// require any models

require("../models/Task");