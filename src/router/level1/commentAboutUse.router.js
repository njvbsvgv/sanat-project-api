const express = require("express")
const commentAboutUse = require("../../controllers/level1/commentAboutUse.controller")
const router = express.Router()

router.post("/AddCommentAboutUse", commentAboutUse.commentAboutUse.addCommentAboutUse)

module.exports = router