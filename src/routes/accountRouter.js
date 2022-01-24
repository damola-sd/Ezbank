const router = require("express").Router();
const controller = require("../controllers/accountController");
const checkUser = require("../helpers/checkIfUserExist");
const checkAccount = require("../helpers/checkThatAccountExixts");

router.post("/create", [checkUser.userExists], controller.createAccount);
router.post("/transfer", [checkAccount.accountIsValid], controller.transfer);

module.exports = router;
