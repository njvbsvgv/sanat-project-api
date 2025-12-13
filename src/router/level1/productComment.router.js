const express = require("express")
const { createNewComment, getAllProductCommentList, createNewCommentReplay, getAllProductCommentReplayList } = require("../../controllers/level1/productComment.controller")

const router = express.Router()

router.post("/createNewComment/:ProductId", createNewComment)
router.post("/createNewCommentReplay/:ProductId/:CommentId", createNewCommentReplay)
router.get("/getAllProductCommentList/:ProductId", getAllProductCommentList)
router.get("/getAllProductCommentReplayList/:ProductId/:CommentId", getAllProductCommentReplayList)

module.exports = router