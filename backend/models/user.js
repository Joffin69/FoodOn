const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  name: { type: String},
  empId: { type: String, unique: true},
  emailId: { type: String},
  phone: { type: Number},
  password: {type: String}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
