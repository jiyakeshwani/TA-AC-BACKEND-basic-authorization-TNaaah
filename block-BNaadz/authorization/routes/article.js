var express = require("express");
var router = express.Router();
var Article = require("../models/articles");
var Comment = require("../models/comments");
var User = require("../models/users");

var auth = require("../middlewares/auth");


router.get("/", (res, req, next) => {
  Article.find({}, (err, article) => {
    if (err) return next(err);
    res.render("allArticles", { article });
  });
});

router.get("/:id", (res, req, next) => {
  var id = req.params.id;
  Article.findById(id),
    (err, article) => {
      if (err) return next(err);
      res.render("articleDetails", { article });
    };
});

router.use(auth.loggedInUser);

router.post("/new", (res, req, next) => {
  console.log(req.body);
  req.body.author = req.user._id;
  Article.create(req.body, (err, article) => {
    if (err) return next(err);
    res.redirect("/article");
  });
});

router.get("/myarticles", (res, req, next) => {
  Article,
    findById(req.user.id, (err, articles) => {
      if (err) return next(err);
      res.render("articleDetails", { articles });
    });
});

router.get("/:id/edit", (res, req, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render("editArticle", { article });
  });
});

router.post("/:id", (res, req, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, (err, updatedArticle) => {
    if (err) return next(err);
    res.redirect("/article/" + id);
  });
});

router.get("/:id/delete", (res, req, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, deletedArticle) => {
    console.log(deletedArticle);
    if (err) return next(err);
    res.redirect("/article");
  });
});

router.get("/:id/increment", (res, req, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect("/article/" + id);
  });
});

router.get("/:id/increment", (res, req, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $dec: { likes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect("/article/" + id);
  });
});

router.post("/:id/comment", (res, req, next) => {
  var id = req.params.id;
  req.body.articleId = id;
  console.log(req.body);
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      id,
      { $push: { comments: comment._id } },
      (err, updatedArticle) => {
        if (err) return next(err);
        res.redirect("/article/" + id);
      }
    );
  });
});
module.exports = router;
