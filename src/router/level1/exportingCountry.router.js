const express = require("express")
const { createExportingCountry, getAllExportingCountry, getSingleExportingCountry } = require("../../controllers/level1/exportingCountry.controller")
const router = express.Router()

router.post("/createExportingCountry", createExportingCountry)
router.get("/getAllExportingCountry", getAllExportingCountry)
router.get("/getSingleExportingCountry/:id", getSingleExportingCountry)

module.exports = router