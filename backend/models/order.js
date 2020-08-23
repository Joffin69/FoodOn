const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const orderSchema = mongoose.Schema({
  orderId: { type: String , unique: true},
  vendorId: { type: String},
  price: {type: Number},
  quantity: {type: Number},
  discount: {type: String},
  estimatedTime: {type: 'String'}
});

orderSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Order", orderSchema);
