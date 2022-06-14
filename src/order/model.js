const mongoose = require("mongoose");
const normalize = require("normalize-mongoose");

const OrderSchema = new mongoose.Schema({
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: { type: Number, default: 0,max:1 },
  customerComment: { type: String, maxlength: 1000 },
  agentComment: { type: String, maxlength: 1000 },
  time:{type: String },
  items: [{
    title: { type: String, required: true },
    measure: { type: String },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
  }],
}, { timestamps: true });
OrderSchema.plugin(normalize);

module.exports = mongoose.model("Order", OrderSchema);