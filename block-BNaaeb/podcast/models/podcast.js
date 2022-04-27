var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var podcastSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    subscription: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Podcast", podcastSchema);
