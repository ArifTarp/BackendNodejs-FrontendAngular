var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");

var author = require("./services/authorService.js");
var user = require("./services/userService.js");
var mongoDb = require("./services/mongoDbConnectionService.js")

var app = express();

app.use(cors());

app.use(bodyParser.json());



mongoDb.connection();
// mongoose.connect(
//   "mongodb+srv://teacherbase:yourPassword@cluster0-zt0bb.mongodb.net/teacherbaseDB",
//   (err, db) => {
//     if (!err) {
//       console.log("Connected to db");
//     }
//   }
// );


app.use("/author", author.router);
app.use("/user", user.router);

app.listen("8080");
