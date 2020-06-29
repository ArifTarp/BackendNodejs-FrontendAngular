var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
