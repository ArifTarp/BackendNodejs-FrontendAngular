var mongoose = require("mongoose");
var mongoDb = require("mongodb");

function connection(authorId) {
  if (authorId) {
    return new Promise((resolve,reject)=>{
      mongoose.connect(
        "mongodb+srv://teacherbase:yourPassword@cluster0-zt0bb.mongodb.net/teacherbaseDB",
        (err, db) => {
          if (!err) {
            console.log("Connected to db for deleted");
            db.collection("authors").deleteOne({ _id: new mongoDb.ObjectId(authorId)  }, function (err, obj) {
               if (err === null) {
                 resolve("Accomplished");
               } else {
                 reject("Fail");
               }
            });
            // db.collection("authors").deleteOne({
            //   _id: new mongoDb.ObjectId(authorId),
            // });
          }
        }
      );
    })
  } else {
    mongoose.connect(
      "mongodb+srv://teacherbase:12345@cluster0-zt0bb.mongodb.net/teacherbaseDB",
      (err, db) => {
        if (!err) {
          console.log("Connected to db");
        }
      }
    );
  }
}

var mongoDbCon = { connection };
module.exports = mongoDbCon;
