const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary");
const key = require("../config/key");
const User = require("../models/user");

// cloudinary config here
cloudinary.config({
  cloud_name: "ximbong91023",
  api_key: key.api_key,
  api_secret: key.api_secret
});

const upload = multer({ dest: "../tmp/uploads" });

router.post("/", function(req, res, next) {
  const { _id, username } = req.user;
  const { image } = req.body;

  cloudinary.uploader.upload(image, function(result) {
    const image_url = result.secure_url;
    User.findById(_id, function(err, user) {
      if (err) return console.error(err);
      user.image_url.push(image_url);
      user.save(function(err) {
        if (err) return console.error(err);
      });
    });
    res.sendStatus(200);
  });
});

module.exports = router;
