const Jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secret = process.env.SECRET;

function generate_token(data = {}) {
  return new Promise((resolve, reject) => {
    Jwt.sign(
      { ...data },
      secret,
      { expiresIn: "12hrs" },
      function (err, token) {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}

exports.generate_token = generate_token;
