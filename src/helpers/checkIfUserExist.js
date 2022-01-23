const User = require("../models/User");

const userExists = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(403).send({
        success: false,
        message: "User with email does not exist",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userExists,
};
