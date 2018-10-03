const express = require("express"),
  router = express.Router();

router.get("/", function(req, res) {
  res.json({
    username: req.user || null
  });
});

module.exports = router;