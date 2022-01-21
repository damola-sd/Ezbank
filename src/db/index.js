const mongoose = require("mongoose");
// const DoctorProfile = require("../models/DoctorProfile");
const User = require("../models/User");

function connection_db() {
  //comment out on local
  // mongoose.connect(`${process.env.DBSERVER}/${process.env.DBNAME}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

  //test db connection
  mongoose.connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.ajb0x.mongodb.net/SpleetDB?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  //live db connection
  //mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cribmddb.ndzu0.mongodb.net/production?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

  //lets check if the connection was not successful
  mongoose.connection.on("error", function () {
    console.error.bind(console, "connection error");
  });

  //index the user
  User.on("index", function (error) {
    if (error) {
      console.error("User index error: %s", error);
    } else {
      console.info("User indexing complete");
    }
  });

  //if the connection was successful
  mongoose.connection.once("open", function () {
    console.log("Database connection was successful");
  });
}

exports.connection_db = connection_db;
