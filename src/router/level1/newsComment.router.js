const express = require("express");
const {
  createNewsComment,
  getNewsCommentList,
  createNewsCommentReplay,
  getNewsReplay,
  likeComment,
  dislikeComment,
} = require("../../controllers/level1/newsComment.controller");
const { middleware } = require("../../core/utility/middleware");
const router = express.Router();

router.post("/CreateNewsComment/:NewsId", middleware, createNewsComment);
router.get("/getNewsCommentList/:NewsId", getNewsCommentList);
router.post(
  "/CreateNewsCommentReplay/:NewsId/:CommentId",
  middleware,
  createNewsCommentReplay,
);
router.get("/getSingleReplay/:NewsId/:CommentId", getNewsReplay);
router.post("/addNewsCommentLike/:NewsId/:CommentId", middleware, likeComment);
router.post(
  "/addNewsCommentDislike/:NewsId/:CommentId",
  middleware,
  dislikeComment,
);

module.exports = router;
