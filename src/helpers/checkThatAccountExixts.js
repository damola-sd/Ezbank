const Account = require("../models/Account");
const TransactionHistory = require("../models/transactionHistory");
const validator = require("./validators");

const accountsIsValid = async (req, res, next) => {
  try {
    await validator.transferDetailsSchema.validate(req.body);
    const destinationAccount = await Account.findOne({
      account_number: req.body.to,
    });
    if (destinationAccount) {
      const sendingAccount = await Account.findOne({
        account_number: req.body.from,
      });
      if (sendingAccount) {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

const accountIsValid = async (req, res, next) => {
  try {
    // await validator.acountNumberSchema.validate(req.body);
    const destinationAccount = await Account.findOne({
      account_number: req.body.account_number,
    });
    if (destinationAccount) {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  accountsIsValid,
  accountIsValid,
};
