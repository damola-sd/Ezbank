const mongoose = require("mongoose");
let User = require("../models/User");
let Account = require("../models/Account");
// const Transaction = require("../models/Transaction");
const generateCode = require("../helpers/generateAccountNumber");

exports.createAccount = async function (req, res, next) {
  try {
    const newAccount = await Account.create({
      balance: 1000,
      account_name: req.user.first_name + " " + req.user.last_name,
      account_number: generateCode.generateCode(),
      account_owner: req.user._id,
    });
    if (newAccount) {
      res.status(200).send({
        data: newAccount,
        success: true,
        message: `Account created, ${newAccount.account_number}`,
      });
    }
  } catch (error) {
    next(error);
  }
};
