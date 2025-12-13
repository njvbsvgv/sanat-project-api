const express = require("express");
const {
  createProductPiece,
  getAllProductPiece,
  getSingleProductPiece,
} = require("../../controllers/level1/productPiece.controller");

const router = express.Router();

router.post("/createProductPiece", createProductPiece);
router.get("/getProductPieceLists", getAllProductPiece);
router.get("/getSingleProductPiece/:id", getSingleProductPiece);

module.exports = router;
