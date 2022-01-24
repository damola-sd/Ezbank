const mongoose = require("mongoose");
let User = require("../models/User");
let Account = require("../models/Account");
const TransactionHistory = require("../models/transactionHistory");
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

exports.transfer = async function (req, res, next) {
  try {
    const { amount, from, to } = req.body;
    const sendingAccount = await Account.findOne({
      account_number: from,
    });
    if (sendingAccount) {
      if (sendingAccount.balance - req.body.amount >= 0) {
        sendingAccount.balance -= req.body.amount;
        sendingAccount.save().then(async () => {
          const destinationAccount = await Account.findOne({
            account_number: req.body.to,
          });
          if (destinationAccount) {
            destinationAccount.balance += req.body.amount;
            destinationAccount.save().then(async () => {
              const recordTransaction = await TransactionHistory.create({
                amount: amount,
                sentFrom: sendingAccount._id,
                receivedIn: destinationAccount._id,
                channel: "web",
                is_successful: true,
              });
              if (recordTransaction) {
                destinationAccount.transaction_history.push({
                  transaction_type: "Credit",
                  amount: amount,
                  is_successful: true,
                });
                await destinationAccount.save();
                sendingAccount.transaction_history.push({
                  transaction_type: "Debit",
                  amount: amount,
                  is_successful: true,
                });
                await sendingAccount.save();
                return res.status(200).send({
                  message: "Transfer Successful",
                  success: true,
                });
              }
            });
          }
        });
      } else {
        return res.status(401).send({
          message: "Not enough funds to make transfer",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.getBalance = async function (req, res, next) {
  try {
    const { account_number } = req.body;
    const accountBalance = await Account.findOne({ account_number });
    if (accountBalance) {
      return res.status(200).send({
        success: true,
        message: "Account balance fetched",
        data: accountBalance.balance,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getTransactionHistory = async function (req, res, next) {
  try {
    const { account_number } = req.body;
    const accountBalance = await Account.findOne({ account_number });
    if (accountBalance) {
      return res.status(200).send({
        success: true,
        message: "Account balance fetched",
        data: accountBalance.transaction_history,
      });
    }
  } catch (error) {
    next(error);
  }
};
