const mongoose = require("mongoose");

const dishSchema = mongoose.Schema({
  name: { type: String },
  fId: { type: String},
  vendorId: { type: String},
  rating: { type: Number},
  type: {type: String},
  price: {type: Number},
  discount: {type: String},
  tsFlag: {type: Boolean},
  path: {type: String}
});

module.exports = mongoose.model("Dish", dishSchema);
