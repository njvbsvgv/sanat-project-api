const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const type = { type: String, required: true };
const type2 = { type: String, required: false };

const NewsSchema = new Schema({
  image: { type: [{ src: type }], required: true },
  title: type,
  googleTitle: type,
  description: type,
  createAt: type,
  updateAt: type,
  studyTime: type,
  categoriesList: [type],
  titleCategories: type,
  rating: type,
  newsItems: [
    {
      image: type,
      title: type2,
      miniDescribe: type2,
    },
  ],
  useInCooking: {
    title: { type: String, required: true },
    tips: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
  },
  keyPoints: { type: [String], required: true },
});

module.exports = mongoose.model("news", NewsSchema);
