const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);