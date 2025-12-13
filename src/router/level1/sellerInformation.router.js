const express = require("express")
const router = express.Router()
const controller = require("../../controllers/level1/sellerInformation.controller")

router.post("/addNewInformation", controller.addInformation)
router.get("/getSellerInformation", controller.getInformation)

module.exports = router