var express = require("express");
var router = express.Router();
var mongoDb = require("mongodb");
var Author = require("../models/author.js");

var user = require("./userService.js");

// router.post("", ...
router.post("/add", user.checkAuthenticated, (request, response) => {
  var authorData = request.body;
  var author = new Author(authorData);

  author.save((err, result) => {
    if (err) {
      console.log(err);
      return response.sendStatus(500).send({ message: error });
    }
    return response.sendStatus(201);
  });
});

router.get("/delete/:id", (request, response) => {
  var authorId = request.params.id.toString();
  // mongoDb.connection(authorId)
  //   .then(() => {
  //     console.log("true geldi");
  //     return response.sendStatus(200);
  //   })
  //   .catch((err) => {
  //     console.log("false geldi");
  //   });
  Author.deleteOne({_id:new mongoDb.ObjectId(authorId)},(err=>{
    if(!err){
      console.log("author accomplished deleted")
    }
    else{
      console.log("fail")
    }
  }));
});

// router.get("", ...
router.get("/list", user.checkAuthenticated, async (request, response) => {
  var authors = await Author.find({}, "-__v");
  response.send(authors);
});

var author = { router };

module.exports = author;
