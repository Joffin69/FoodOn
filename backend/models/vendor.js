const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema({
  name: { type: String },
  vendorId: { type: String},
  rating: { type: Number}
});

module.exports = mongoose.model("Vendor", vendorSchema);
