const router = require("express").Router();
const controller = require("../controllers/accountController");
const checkUser = require("../helpers/checkIfUserExist");
const checkAccount = require("../helpers/checkThatAccountExixts");

router.post("/create", [checkUser.userExists], controller.createAccount);
router.post("/transfer", [checkAccount.accountsIsValid], controller.transfer);
router.post(
  "/getBalance",
  [checkAccount.accountIsValid],
  controller.getBalance
);
router.post(
  "/getHistory",
  [checkAccount.accountIsValid],
  controller.getTransactionHistory
);

module.exports = router;
