const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const createProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  miniDescription: { type: String, required: true },
  useInCooking: {
    title: { type: String, required: true },
    tips: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
  },
  price: { type: String, required: true },
  imageAddress: { type: String, required: true },
  photos: { type: [String] },
  quality: { type: String, required: true },
  xportingCountry: { type: String, required: true },
  keyPoints: { type: [String], required: true },
  type: { type: String, required: true },
  brand: { type: [String], required: true },
  isBones: { type: String, required: true },
  createAt: { type: String, required: true },
  updateAt: { type: String, required: true },
});

module.exports = mongoose.model("products", createProductSchema);
