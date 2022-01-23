const User = require("../models/User");
const Bcrypt = require("bcryptjs");
const TokenGenerator = require("../helpers/generateToken");
const yup = require("yup");
const validator = require("../helpers/validators");

exports.register = async function (req, res, next) {
  if (req.method == "POST") {
    let email = req.body.email;
    email = email.toLowerCase();
    try {
      await validator.userRegisterSchema.validate(req.body);
      const oldUser = await User.findOne({ email: email });
      if (oldUser) {
        return res.status(401).send({
          status: 403,
          message: "A user with this email already exists",
          success: false,
        });
      }
      const newUser = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
      });
      if (newUser) {
        return res.status(200).send({
          data: newUser,
          success: true,
          message: "Registration Successful",
        });
      }
    } catch (error) {
      next(error);
    }
  }
};
