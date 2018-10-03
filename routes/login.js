const express = require("express"),
  passport = require("passport"),
  router = express.Router();

//handling user login
router.post("/", passport.authenticate("local"), function(req, res, next) {
  res.json({
    username: req.user.username
  });
});

module.exports = router;