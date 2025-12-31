const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const type = { type: String, required: true };
const type2 = { type: String, required: false };

const newsCommentSchema = new Schema({
  userPic: type2,
  userName: type2,
  newsId: type,
  title: type,
  description: type,
  likeCount: type,
  desLikeCount: type,
  createAt: type,
});

const newsCommentReplaySchema = new Schema({
  userPic: type2,
  userName: type2,
  newsId: type,
  commentId: type,
  title: type,
  description: type,
  likeCount: type,
  desLikeCount: type,
  createAt: type,
});

module.exports = {
  NewsCommentSchema: mongoose.model("newscomments", newsCommentSchema),
  NewsCommentReplaySchema: mongoose.model(
    "newscommentsreplays",
    newsCommentReplaySchema
  ),
};
