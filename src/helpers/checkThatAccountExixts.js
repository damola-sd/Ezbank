const Account = require("../models/Account");
const TransactionHistory = require("../models/transactionHistory");

const accountIsValid = async (req, res, next) => {
  try {
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

module.exports = {
  accountIsValid,
};
