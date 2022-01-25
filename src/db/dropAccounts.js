const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(
  `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.ajb0x.mongodb.net/TestDB?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.dropDatabase().then(() => {
  console.log("Test DB dropped");
});
// return;
mongoose.connection.close();
