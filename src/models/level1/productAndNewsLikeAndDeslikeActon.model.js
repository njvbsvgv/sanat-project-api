const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productAndNewsLikeAndDeslikeActonSchema = new Schema({
  targetId: { type: String, required: true },
  commentId: { type: String, required: true },
  likeDB: { type: [String], required: true },
  deslikeDB: { type: [String], required: true },
});

module.exports = mongoose.model(
  "productandnewslikeanddeslikeactons",
  productAndNewsLikeAndDeslikeActonSchema
);
