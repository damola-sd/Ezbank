const router = require("express").Router();
const controller = require("../controllers/accountController");
const checkUser = require("../helpers/checkIfUserExist");

router.post("/create", [checkUser.userExists], controller.createAccount);

module.exports = router;
