const express = require("express");

const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.send({ msg: "login first" });
  }
  jwt.verify(token, "lucifer", function (err, decoded) {
    // err
    // decoded undefined
    const userID = decoded.userID;
    if (err) {
      res.send("invalid token or secretkey");
    } else {
      req.userID = userID;
      next();
    }
  });
};

module.exports = { authorization };
