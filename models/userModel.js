const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true, index: true },
  password: String,
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model("user", UserSchema);
