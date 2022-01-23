const yup = require("yup");

const userRegisterSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  phone: yup.string(),
  email: yup.string().email().required(),
  phone: yup.string(),
});

module.exports = {
  userRegisterSchema,
};
