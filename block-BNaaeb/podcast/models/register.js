var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var registerSchema = new Schema(
  {
    name: { type: String, require: true },

    email: { type: String, unique: true },
    password: { type: String, minlength: 5 },
    city: String,
    subscription: { type: String, required: true },
  },
  { timestamps: true }
);

registerSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) return next(err);
      this.password = hashed;
      return next();
    });
  } else {
    next();
  }
});

registerSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result);
  });
};

module.exports = mongoose.model("Register", registerSchema);
