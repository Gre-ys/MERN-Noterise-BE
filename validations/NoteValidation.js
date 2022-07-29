const yup = require("yup");

const noteSchema = yup.object().shape({
  title: yup.string().required().max(50),
  content: yup.string().required().min(30),
});

module.exports = noteSchema;
