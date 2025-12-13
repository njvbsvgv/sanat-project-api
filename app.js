require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const productRouter = require("./src/router/level1/product.router")
const locationRouter = require("./src/router/level1/location.router")
const loginRouter = require("./src/router/level1/login.router")
const landingRouter = require("./src/router/level1/landing.router")
const commentAboutUseRouter = require("./src/router/level1/commentAboutUse.router")
const sellerInformationRouter = require("./src/router/level1/sellerInformation.router")
const productPieceRouter = require("./src/router/level1/productPiece.router")
const exportingCountryRouter = require("./src/router/level1/exportingCountry.router")
const productTypeRouter = require("./src/router/level1/productType.router")
const newsRouter = require("./src/router/level1/news.router")
const productCommentRouter = require("./src/router/level1/productComment.router")



app.use("/project/api", productRouter);
app.use("/project/api", locationRouter);
app.use("/project/api", loginRouter);
app.use("/project/api", landingRouter);
app.use("/project/api", commentAboutUseRouter);
app.use("/project/api", sellerInformationRouter);
app.use("/project/api", productPieceRouter);
app.use("/project/api", exportingCountryRouter);
app.use("/project/api", productTypeRouter);
app.use("/project/api", newsRouter);
app.use("/project/api", productCommentRouter);

const PORT = process.env.PORT || 4001;
mongoose
  .connect("mongodb://127.0.0.1:27017/sanatProjectDataBase")
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => console.log("error ==>", error));
