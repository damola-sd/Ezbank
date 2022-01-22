const yup = require("yup");

exports.userRegisterSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  phone: yup.string(),
  email: yup.string().email().required(),
  phone: yup.string(),
});
