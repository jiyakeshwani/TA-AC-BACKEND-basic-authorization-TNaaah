var express = require("express");
var router = express.Router();
var User = require("../models/users");

router.get("/register", (req, res, next) => {
  res.render("register");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/register", (res, req, next) => {
  console.log(req.body);
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.redirect("/users/login", { user });
  });
});

router.post("/login", (res, req, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    return res.redirect("/users/login");
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.redirect("/users/login");
    }
    user.verifyPassword(password, (err, result, userData) => {
      if (err) return next(err);
      if (!result) {
        return res.redirect("/users/login");
      }
      req.session.userId = user.id;
      res.render("article", { userData });
    });
  });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/users/login");
});
module.exports = router;
