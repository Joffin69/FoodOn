const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String },
  empId: { type: String},
  emailId: { type: String},
  phone: { type: Number},
  password: {type: String}
});

module.exports = mongoose.model("User", userSchema);
