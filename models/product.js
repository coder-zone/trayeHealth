var mongoose = require("mongoose");
var ProductSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", index: true },
  SKU: String,
  productName: String,
  productDesc: String,
  price: Number,
  isActive: { type: Boolean, default: true },

}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model("product", ProductSchema);
