const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: String,
  mobile: String,
  email: String,
  gender: String,
  dob: String,
  location: String,
  altMobile: String,
  hintName: String,
  password: String, // hashed
});

module.exports = mongoose.model("User", UserSchema);
