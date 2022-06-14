const mongoose = require("mongoose");
const normalize = require("normalize-mongoose");

const ProductSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, minlength: 2, maxlength: 100, required: true },
  desc: { type: String, maxlength: 1000 },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  measure: { type: String },
  media: { type: String},
  active: { type: Boolean, default: true },
});

ProductSchema.plugin(normalize);

module.exports = mongoose.model("Product", ProductSchema);