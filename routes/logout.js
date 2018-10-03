const express = require("express"),
  router = express.Router();

//handling user sign up
router.get("/", function(req, res) {
  req.logout();
  res.json({
    username: req.user || null
  });
});

module.exports = router;
