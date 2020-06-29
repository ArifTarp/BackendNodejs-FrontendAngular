var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
  name: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
});

module.exports = mongoose.model("Course", courseSchema);
