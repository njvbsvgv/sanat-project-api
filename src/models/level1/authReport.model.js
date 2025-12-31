const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthReportSchema = new Schema({
  signUp: {
    videoSrc: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  signIn: {
    videoSrc: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
});

const UserSchema = new Schema({
  emailOrPhoneNumber: { type: String, required: false },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  role: { type: [String], required: false },
});

module.exports = {
  AuthReportModel: mongoose.model("authreports", AuthReportSchema),
  UserModel: mongoose.model("usersdatas", UserSchema),
};
