function loggedIn(req, res, next) {
    if (req.user) {
      console.log(req.user);
      next();
    } else {
      console.log("not logged in");
      res.send(false);
    }
  }
  
  module.exports = loggedIn;