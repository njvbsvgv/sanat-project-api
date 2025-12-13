const express = require("express")
const { createProductType, getAllProductType, getSingleProductType, deleteProductType } = require("../../controllers/level1/productType.controller")
const router = express.Router()

router.post("/createProductType", createProductType)
router.get("/getProductTypeLists", getAllProductType)
router.get("/getSingleProductType/:id", getSingleProductType)
router.delete("/deleteProductType/:id", deleteProductType)

module.exports = router