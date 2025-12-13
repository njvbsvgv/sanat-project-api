const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const informationModel = new Schema({
  homePhone: { type: String, required: true },
  phoneNumber: { type: [String], required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("informationdatas", informationModel);
