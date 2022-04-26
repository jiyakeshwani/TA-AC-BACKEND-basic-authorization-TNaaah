var express = require("express");
var router = express.Router();
var Article = require("../models/articles");
var Comment = require("../models/comments");
var auth = require("../middlewares/auth");
const comments = require("../models/comments");

router.get("/:id/edit", (res, req, next) => {
  var id = req.params.id;
  Comment.findById(id, (err, comment) => {
    if (err) return next(err);
    res.render("editComment", { comment });
  });
});

router.post("/:id", (res, req, next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, (err, updatedComment) => {
    if (err) return next(err);
    res.redirect("/article/" + updatedComment.articleId);
  });
});

router.get("/:id/delete", (res, req, next) => {
  var id = req.params.id;
  Comment.findByIdAndDelete(id, (err, deletedComment) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      deletedComment.articleId,
      { $pull: { comments: deletedComment._id } },
      (err, updatedArticle) => {
        if (err) return next(err);
        res.redirect("/article/" + deletedcomment.articleId);
      }
    );
  });
});
module.exports = router;
