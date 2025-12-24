const express = require("express");
const {
  createNews,
  getAllNews,
  getTopNews,
  getNewsByRate,
  getSingleNews,
  createNewsItem,
  addNewsImage,
} = require("../../controllers/level1/news.controller");
const {
  getAllNewsType,
  getSingleNewsType,
} = require("../../controllers/level1/newsType.controller");
const { uploadImageController } = require("../../core/utility/upload");
// const uploader = require("../../core/utility/upload");

const router = express.Router();
const storage = multer.memoryStorage(); // فایل در حافظه نگه داشته می‌شود
const upload = multer({ storage });

router.post("/createNews", createNews);
router.post("/createNewsItems/:NewsId", uploader.upload.single("image"), createNewsItem);
router.post("/addImageNews/:NewsId", upload.single("image"), uploadImageController);
router.get("/getNewsLists", getAllNews);
router.get("/getTopNews", getTopNews);
router.get("/getNewsByRate", getNewsByRate);
router.get("/getNewsTypeList", getAllNewsType);
router.get("/getSingleNewsType", getSingleNewsType);
router.get("/getSingleNews/:newsId", getSingleNews)

module.exports = router;
