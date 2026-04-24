const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewsLikeAndDislikeSchema = new Schema({
  newsId: { type: String, required: true },
  likeDB: { type: [String], required: true },
  dislikeDB: { type: [String], required: true },
});

module.exports = mongoose.model(
  "newslikeanddislikes",
  NewsLikeAndDislikeSchema,
);
