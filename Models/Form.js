const mongoose = require("mongoose");

const Form = mongoose.model("Form", {
  name: String,
  mail: String,
  message: String,
});

module.exports = Form;
