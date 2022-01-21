const mongoose = require("mongoose");
let User = require("../../models/User");
let Account = require("../../models/Account");
const Transaction = require("../../models/Transaction");
const generateCode = require("../helpers/generateAccountNumber");

exports.createAccount = async function (req, res) {
  User.create({});
};
