const express = require("express")
const { createNewsComment, getNewsCommentList, createNewsCommentReplay, getNewsReplay } = require("../../controllers/level1/newsComment.controller")
const router = express.Router()

router.post("/CreateNewsComment/:NewsId", createNewsComment)
router.get("/getNewsCommentList/:NewsId", getNewsCommentList)
router.post("/CreateNewsCommentReplay/:NewsId/:CommentId", createNewsCommentReplay)
router.get("/getSingleReplay/:NewsId/:CommentId", getNewsReplay)

module.exports = router