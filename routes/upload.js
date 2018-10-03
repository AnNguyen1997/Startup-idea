const express = require("express"),
  router = express.Router(),
  multer = require("multer"),
  cloudinary = require("cloudinary"),
  key = require("../config/key"),
  User = require("../models/user");

// cloudinary config here
cloudinary.config({
  cloud_name: "ximbong91023",
  api_key: key.api_key,
  api_secret: key.api_secret
});

const upload = multer({ dest: "../tmp/uploads" });

router.post("/", upload.single("image"), function(req, res, next) {
  const { _id, username } = req.user;

  console.log('req.user', req.user);
  console.log('req.file', req.file);

  cloudinary.v2.uploader.upload(req.file.path, function(error, result) {
    const image_url = result.secure_url;
    User.findById(_id, function(err, user) {
      if (err) return console.error(err);
      user.image_url.push(image_url);
      user.save(function(err, post) {
        if (err) return console.error(err);
      });
    });
  });
});

module.exports = router;
