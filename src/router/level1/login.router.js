const express = require("express")
const loginMiddleware = require("../../middleware/login.middleware")
const { loginController } = require("../../controllers/level1/login.controller")

const router = express.Router()

router.post("/login", loginController)

module.exports = router