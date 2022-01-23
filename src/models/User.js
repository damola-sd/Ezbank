const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, select: false },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
});

user.index({
  first_name: "text",
  last_name: "text",
  email: "text",
});

module.exports = mongoose.model("User", user);
