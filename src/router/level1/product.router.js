const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/level1/product.controller");
const uploader = require("../../core/utility/upload");

// const storage = multer.memoryStorage(); // فایل در حافظه نگه داشته می‌شود
// const upload = multer({ storage });

router.post("/CreateProduct", controllers.productControllers.createProduct);

router.post(
  "/addImage/:productId",
  uploader.upload.single("imageAddress"),
  controllers.productControllers.addImage
);

router.get("/getProductLists", controllers.productControllers.getProductsList)
router.get("/getSingleProduct/:id", controllers.productControllers.getSingleProduct)
router.get("/getSimilarPeoducts/:productTypeId", controllers.productControllers.getSimilarProducts)

module.exports = router;
