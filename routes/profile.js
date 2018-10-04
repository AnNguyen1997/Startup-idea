const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", function(req, res) {
  const { _id } = req.user;
  console.log("_id", _id);

  User.findById(_id, function(err, user) {
    if (err) return console.error(err);
    console.log(user);
    res.json(user);
  });
});

module.exports = router;
