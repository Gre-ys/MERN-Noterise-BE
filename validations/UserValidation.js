const yup = require("yup");

const userRegisterSchema = yup.object().shape({
  username: yup.string().required().min(5),
  password: yup.string().required().min(6),
  email: yup.string().required().email(),
});

const userLoginSchema = yup.object().shape({
  username: yup.string().required().min(5),
  password: yup.string().required().min(6),
});

module.exports = { userRegisterSchema, userLoginSchema };
