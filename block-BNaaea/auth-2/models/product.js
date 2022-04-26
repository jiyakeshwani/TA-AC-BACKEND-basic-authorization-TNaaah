var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var productSchema = new Schema(
  {
    name: { type: String, require: true },

    description: { type: String, required: true },
    category: { type: String, required: true },
    image: {
      data: Buffer,
      contentType: String,
    },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
