const express = require("express");
const {
  createNewComment,
  getAllProductCommentList,
  createNewCommentReplay,
  getAllProductCommentReplayList,
  likeComment,
  deslikeComment,
} = require("../../controllers/level1/productComment.controller");
const { middleware } = require("../../core/utility/middleware");

const router = express.Router();

router.post("/createNewComment/:ProductId", middleware, createNewComment);
router.post(
  "/createNewCommentReplay/:ProductId/:CommentId",
  middleware,
  createNewCommentReplay
);
router.post(
  "/likeComment/:ProductId/:CommentId",
  middleware,
  likeComment
);
router.post(
  "/deslikeComment/:ProductId/:CommentId",
  middleware,
  deslikeComment
);
router.get("/getAllProductCommentList/:ProductId", getAllProductCommentList);
router.get(
  "/getAllProductCommentReplayList/:ProductId/:CommentId",
  getAllProductCommentReplayList
);

module.exports = router;
