const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const type = { type: String, required: true };
const type2 = { type: String, required: false };

const NewsSchema = new Schema({
  title: type,
  googleTitle: type,
  description: type,
  createAt: type,
  updateAt: type,
  studyTime: type,
  categoriesList: [type],
  titleCategories: type,
  rating: type,
  newsItems: {
    title: type2,
    miniDescribe: type2,
    options: [
      {
        title: type2,
        description: type2,
      },
    ],
    keyPoints: [type2],
  },
});

module.exports = mongoose.model("news", NewsSchema);
