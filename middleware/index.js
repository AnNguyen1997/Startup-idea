function loggedIn(req, res, next) {
  console.log(req.user);
  if (req.user) {
    next();
  } else {
    res.json({
      username: null
    });
  }
}

module.exports = loggedIn;
