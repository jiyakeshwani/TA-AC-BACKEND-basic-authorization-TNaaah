var express = require("express");

var router = express.Router();
var Podcast = require("../models/Podcast");

router.get("/", (req, res) => {
  res.render("admin");
});

router.get("/podcast", (res, req, next) => {
  res.render("podcast");
});
router.get("/new", (req, res) => {
  res.render("addPodcast");
});

router.post("/new", (req, res, next) => {
  Podcast.create(req.body, (err, podcast) => {
    if (err) return next(err);
    console.log(podcast);
    res.redirect("/admin");
  });
});

router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Podcast.findById(id, (err, podcast) => {
    if (err) return next(err);
    res.render("podcastDetails");
  });
});

router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Podcast.findById(id, (err, podcast) => {
    if (err) return next(err);
    res.render("editPodcast");
  });
});

router.post("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Podcast.findByIdAndUpdate(id, (err, updatedPodcast) => {
    if (err) return next(err);
    res.redirect("/admin/podcast", { updatedPodcast });
  });
});

router.get("/:id/delete", (res, req, next) => {
  var id = req.params.id;
  Podcast.findByIdAndDelete(id, (err, deletedPodcast) => {
    console.log(deletedPodcast);
    if (err) return next(err);
    res.redirect("/admin/podcast");
  });
});
module.exports = router;
