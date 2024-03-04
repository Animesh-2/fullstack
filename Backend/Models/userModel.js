const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  phone_number: { type: Number, require: true },
  department: { type: String, require: true },
});

const usermodel = mongoose.model("user", userSchema);

module.exports = { usermodel };
