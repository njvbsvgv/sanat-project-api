const express = require("express")
const locationController = require("../../controllers/level1/addLocation.controller")

const router = express.Router()

router.put("/AddLocation", locationController.addLocation)
router.get("/getLocation", locationController.getLocation)

module.exports = router