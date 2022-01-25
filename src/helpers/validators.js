const yup = require("yup");

const userRegisterSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  phone: yup.string(),
  email: yup.string().email().required().trim(),
  phone: yup.string(),
});

const createAccountSchema = yup.string().email().required().trim();

const acountNumberSchema = yup.string().required();

const transferDetailsSchema = yup.object().shape({
  to: yup.string().required().trim(),
  from: yup.string().required().trim(),
  amount: yup.number().required(),
});

module.exports = {
  userRegisterSchema,
  createAccountSchema,
  transferDetailsSchema,
  acountNumberSchema,
};
