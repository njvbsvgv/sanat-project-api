const mongoose = require("mongoose")

const Schema = mongoose.Schema

const type = { type: String, required: true }
const type2 = { type: String, required: false }

const ProductCommentSchema = new Schema({
    userPic: type,
    userName: type,
    productId: type,
    title: type,
    description: type,
    likeCount: type,
    desLikeCount: type,
    createAt: type
})

const ProductCommentReplaySchema = new Schema({
    userPic: type,
    userName: type,
    productId: type,
    commentId: type,
    title: type,
    description: type,
    likeCount: type,
    desLikeCount: type,
    createAt: type
})

module.exports = {
    ProductCommentSchema: mongoose.model("productcomments", ProductCommentSchema),
    ProductCommentReplaySchema: mongoose.model("productcommentsreplays", ProductCommentReplaySchema),
}