const express = require("express");
const {
  createNews,
  getAllNews,
  getTopNews,
  getNewsByRate,
  getSingleNews,
  createNewsItem,
} = require("../../controllers/level1/news.controller");
const {
  getAllNewsType,
  getSingleNewsType,
} = require("../../controllers/level1/newsType.controller");
const uploader = require("../../core/utility/upload");

const router = express.Router();

router.post("/createNews", createNews);
router.post("/createNewsItems/:NewsId", uploader.upload.single("image"), createNewsItem);
router.get("/getNewsLists", getAllNews);
router.get("/getTopNews", getTopNews);
router.get("/getNewsByRate", getNewsByRate);
router.get("/getNewsTypeList", getAllNewsType);
router.get("/getSingleNewsType", getSingleNewsType);
router.get("/getSingleNews/:newsId", getSingleNews)

module.exports = router;
