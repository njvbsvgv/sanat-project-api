const express = require("express")
const { createNews, getAllNews } = require("../../controllers/level1/news.controller")

const router = express.Router()

router.post("/createNews", createNews)
router.get("/getNewsLists", getAllNews)

module.exports = router