const express = require("express");
const {
  createNews,
  getAllNews,
  getTopNews,
  getNewsByRate,
  getSingleNews,
  createNewsItem,
  addNewsImage,
  updateNews,
  getSimilarNewsByType,
  addNewsRate,
  deleteNewsRate
} = require("../../controllers/level1/news.controller");
const {
  getAllNewsType,
  getSingleNewsType,
  createNewsType,
} = require("../../controllers/level1/newsType.controller");
const multer = require("multer");
const { middleware } = require("../../core/utility/middleware");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/createNews", createNews);
router.post("/createNewsItems/:NewsId", upload.single("image"), createNewsItem);
router.post("/addImageNews/:NewsId", upload.single("image"), addNewsImage);
router.get("/getNewsLists", getAllNews);
router.get("/getTopNews", getTopNews);
router.get("/getNewsByRate", getNewsByRate);
router.get("/getNewsTypeList", getAllNewsType);
router.get("/getSingleNewsType", getSingleNewsType);
router.get("/getSingleNews/:newsId", getSingleNews)
router.put("/updateNews/:NewsId", updateNews)
router.get("/getSimilarNewsByType/:NewsId", getSimilarNewsByType)
router.post("/createNewsType", createNewsType)
router.post("/addNewsRate/:NewsId", middleware, addNewsRate)
router.post("/deleteNewsRate/:NewsId", middleware, deleteNewsRate)

module.exports = router;
