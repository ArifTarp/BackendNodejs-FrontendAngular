var mongoose = require("mongoose");

var authorSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  biography: String,
});

module.exports = mongoose.model("Author", authorSchema);
