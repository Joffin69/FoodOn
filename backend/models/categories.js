const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryId: { type: String },
  name: { type: String},
  vendorId: { type: String}
});

module.exports = mongoose.model("Category", categorySchema);
