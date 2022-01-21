const User = require("../models/User");
const Bcrypt = require("bcryptjs");
const TokenGenerator = require("../helpers/generateToken");

exports.register = async function (req, res) {
  if (req.method == "POST") {
    let email = req.body.email;
    email = email.toLowerCase();

    User.findOne({ email: email }).then((found) => {
      if (found) {
        res.status(401).send({
          success: false,
          message:
            "A user with this email already exist, did you forget your password?",
        });
      } else {
        //var passwordHash = Bcrypt.hashSync(req.body.password , 10)
        Bcrypt.hash(req.body.password, 10, function (error, passwordHash) {
          if (error) {
            res.send({ status: 500, error: error });
          } else {
            new User({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: email,
              phone: req.body.phone,
              password: passwordHash,
            }).save(async function (error, user) {
              if (error) {
                res.send({
                  status: 401,
                  success: false,
                  message: error,
                });
              } else {
                TokenGenerator.generate_token({
                  email: user.email,
                  id: user._id,
                })
                  .then((token) => {
                    //set a session with the token generated
                    req.session.token = token;

                    //Remove the password field from the object sent back
                    user.password = undefined;

                    res.send({
                      status: 200,
                      success: true,
                      user: user,
                      token: token,
                      message: "Registration Successful",
                    });
                  })
                  .catch((error) => {
                    res.send({
                      status: 500,
                      success: false,
                      error: error,
                    });
                  });
              }
            });
          }
        });
      }
    });
  }
};
