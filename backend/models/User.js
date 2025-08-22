const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  bloodgroup: {type: String, required: true},
  dob: { type: Date, required: true },
  role: { type: String, default: "user" },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
