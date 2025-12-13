const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loginSchema = new Schema({
  nationalCode: { type: String, required: true },
  userName: { type: String, required: false },
  password: { type: String, required: true },
  role: { type: Array, required: false },
});

module.exports = mongoose.model("users", loginSchema);
