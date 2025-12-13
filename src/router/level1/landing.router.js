const express = require("express")
const router = express.Router()
const controller = require("../../controllers/level1/landingReport.controller")

router.get("/getLandingReport", controller.landingReportController.landingReportController)
router.put("/updateLandingReport", controller.landingReportController.updateReport) 
module.exports = router