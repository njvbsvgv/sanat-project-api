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
} = require("../../controllers/level1/news.controller");
const {
  getAllNewsType,
  getSingleNewsType,
} = require("../../controllers/level1/newsType.controller");
const multer = require("multer");
// const { uploadImageController } = require("../../core/utility/upload");
// const uploader = require("../../core/utility/upload");

const router = express.Router();
const storage = multer.memoryStorage(); // فایل در حافظه نگه داشته می‌شود
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

module.exports = router;
