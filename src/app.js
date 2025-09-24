require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer();

const app = express();

app.use(express.json());
app.use(upload.none());

app.use("/api");

mongoose
  .connect("mongodb://127.0.0.1:27017/sanatProjectDataBase")
  .then(() => {
    app.listen(8000);
  })
  .catch((error) => console.log("error ==>", error));
