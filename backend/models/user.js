const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  empId: { type: String, required: true },
  emailId: { type: String, required: true},
  phone: { type: Number, required: true },
  password: {type: String, required: true}
});


module.exports = mongoose.model("User", userSchema);
