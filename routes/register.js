const express = require("express"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  router = express.Router(),
  User = require("../models/user");

//handling user sign up
router.post("/", function(req, res) {
  const { username, password } = req.body;
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username
  });

  User.register(user, password, function(err, user) {
    if (err) {
      console.log(err);
      res.send({
        message: err.message
      });
    }
    passport.authenticate("local")(req, res, function() {
      res.send({
        username
      });
    });
  });
});

module.exports = router;
