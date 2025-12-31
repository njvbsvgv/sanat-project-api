const express = require("express");
const multer = require("multer");
const {
  addAuthReport,
  getAuthReport,
  signUp,
  signIn,
} = require("../../controllers/level1/auth.controller");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post(
  "/addAuthReport",
  upload.fields([
    { name: "signUpVideo", maxCount: 1 },
    { name: "signInVideo", maxCount: 1 },
  ]),
  addAuthReport
);

router.get("/getAuthReport", getAuthReport);

router.post("/signUpUser", signUp)
router.post("/signInUser", signIn)

module.exports = router;
