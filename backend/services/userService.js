var express = require("express");
var router = express.Router();
var jwt = require("jwt-simple");

var User = require("../models/user.js");

router.post("/register", (request, response) => {
  var userData = request.body;
  var user = new User(userData);
  user.save((err, result) => {
    if (err) {
      console.log("Error saving the user");
      return response.sendStatus(500);
    }

    return response.status(201).send({ message: "Register Accomplished" });
  });
});

router.post("/login", async (request, response) => {
  var userData = request.body;

  if(Object.keys(userData).length === 0 && userData.constructor === Object){
    return response.status(401).send({ message: "Email or password invalid" });
  }
  
  var claimUser = await User.findOne({ email: userData.email });

  if (!claimUser) {
    return response.status(401).send({ message: "Email or password invalid" });
  }

  if (userData.password != claimUser.password) {
    return response.status(401).send({ message: "Email or password invalid" });
  }

  // jwt-simple
  // token in http body
  // payload in token
  var payload = {
    email: userData.email,
  };
  var token = jwt.encode(payload, "12345");
  return response.status(200).send({ token });

  // token in http header
  // payload in token
  // var payload = {};
  // var token = jwt.encode(payload, "12345");
  // response.writeHead(200, { Token: token });

  // return response.end();
});

var user = {
  router,
  checkAuthenticated: (request, response, next) => {
    if (!request.header("authorization")) {
      return response
        .status(401)
        .send({ message: "Unauthorized. No Authorization Header" });
    }

    var token = request.header("authorization").split(" ")[1];

    // below code is token validation in back-end
    // front-end validation is in auth-interceptor.service.ts line 14
    // if(token === "null"){
    //   return response.status(401).send({message:"Unauthorized. Token is empty"})
    // }

    // payload is user email, in this page line 38
    var payload = jwt.decode(token, "12345");
    if (!payload) {
      return response
        .status(401)
        .send({ message: "Unauthorized. Token is not valid" });
    }

    next();
  },
};

module.exports = user;
