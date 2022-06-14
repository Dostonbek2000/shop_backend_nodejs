const mongoose = require("mongoose");
const normalize = require("normalize-mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, lowercase: true },
    role: { type: String, lowercase: true },
    inn: { type: Number, default: 0 },
    phone: { type: String, required: true, max: 50 },
    address: { type: String, maxlength: 1000 },
    title: { type: String, maxlength: 1000 },
    desc: { type: String, maxlength: 1000 },
    media: { type: String},
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(normalize);
module.exports = mongoose.model("User", UserSchema);
