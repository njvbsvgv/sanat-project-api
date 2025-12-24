const { dateGenerator } = require("../../core/utility/date-generator");
const { filterProducts } = require("../../core/utility/filter-products");
const { useUploadImage } = require("../../core/utility/upload");
// const getImageUrl = require("../../core/utility/upload");
const Product = require("../../models/level1/createProduct-models");
const ProductTypes = require("../../models/level1/productType.model")

const getProductsList = async (req, res, next) => {
  const {
    PageNumber,
    RowsOfPage,
    Query,
    ProductTypeId,
    ProductQuality,
    LssuingCountryId,
    minPrice,
    maxPrice,
  } = req.query;

  let dataValidate = false;

  if (
    PageNumber ||
    RowsOfPage ||
    Query ||
    ProductTypeId ||
    ProductQuality ||
    LssuingCountryId ||
    minPrice ||
    maxPrice
  ) {
    dataValidate = true;
  }

  const productList = await Product.find();
  const result = await filterProducts(
    productList,
    PageNumber,
    RowsOfPage,
    Query,
    ProductTypeId,
    ProductQuality,
    LssuingCountryId,
    minPrice,
    maxPrice
  );
  console.log("pagination result ==>", result);
  // return res.status(200).json({ data: result ? result : productList, totalCount: result ? result.length : productList.length });
  return res
    .status(200)
    .json({
      data: dataValidate ? result : productList,
      totalCount: result.length > 0 ? productList.length : result.length,
    });
};

const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const findTypes = 
    const findData = await Product.findOne({ _id: id });
    return res.status(200).json({ message: "gettedData", data: findData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "مشکلی پیش اومده", message2: error.message });
  }
};

const getSimilarProducts = async (req, res, next) => {
  try {
    const { productTypeId } = req.params;
    const data = await Product.find({ _id: productTypeId });
    if (data && data.length != 0) {
      return res
        .status(200)
        .json({ data: data, totalCount: data.length });
    }
  } catch (error) {
    return res
      .status(200)
      .json({ message: "مشکلی پیش اومده", message2: error.message });
  }
};

const createProduct = async (req, res, next) => {
  if (req.body) {
    const {
      title,
      description,
      miniDescription,
      useInCooking,
      quality,
      xportingCountry,
      keyPoints,
      type,
      brand,
      isBones,
      imageAddress,
      price,
    } = req.body;
    if (
      !title.trim() != "" ||
      !description.trim() != "" ||
      !miniDescription.trim() != "" ||
      !useInCooking.title.trim() != "" ||
      !quality.trim() != "" ||
      !xportingCountry.trim() != "" ||
      !type.trim() != "" ||
      !isBones.trim() != "" ||
      !price.trim() != ""
    ) {
      return res.status(400).json({ message: "فیلدها خالیست" });
    } else {
      let isValidate = false;
      useInCooking.tips.forEach((items) =>
        items.title != "" && items.description != ""
          ? (isValidate = true)
          : (isValidate = false)
      );
      keyPoints.forEach((items) =>
        items != "" ? (isValidate = true) : (isValidate = false)
      );
      brand.forEach((items) =>
        items != "" ? (isValidate = true) : (isValidate = false)
      );
      if (isValidate) {
        const date = dateGenerator();
        try {
          const newProduct = new Product({
            title,
            description,
            isBones: isBones,
            brand: brand,
            miniDescription: miniDescription,
            type: type,
            quality: quality,
            keyPoints: keyPoints,
            useInCooking: useInCooking,
            xportingCountry: xportingCountry,
            createAt: date,
            updateAt: date,
            imageAddress: "null",
            price: price,
            photos: null,
          });
          await newProduct.save();
          return res
            .status(201)
            .json({ message: "محصول جدید با موفقیت ساخته شد" });
        } catch (error) {
          console.log("error ==>", error.message);
          return res.status(400).json({
            message: "لطفا تمامی فیلدها را با دقت پر کنید",
            message2: error.message,
          });
        }
      } else {
        return res
          .status(400)
          .json({ message: "لطفا تمامی فیلدها را با دقت پر کنید" });
      }
    }
  } else {
    return res
      .status(400)
      .json({ message: "لطفا تمامی فیلدها را با دقت پر کنید" });
  }
};

const addImage = async (req, res, next) => {
  if (req.body) {
    const { productId } = req.params;
    if (productId && productId !== "") {
      try {
        // const image = getImageUrl.getImageUrl(req, req.file);
        const imageUrl = await useUploadImage(req.file.buffer, "uploads");
        const findProduct = await Product.findOne({ _id: productId });
        const updated = await Product.updateOne(
          { _id: productId },
          { $set: { imageAddress: image, photos: [findProduct.photos, imageUrl] } }
        );
        return res.status(updated.acknowledged ? 201 : 500).json({
          message: updated.acknowledged ? "عکس با موفقیت اضافه شد" : "",
        });
      } catch (error) {
        return res.status(500).json({ message: "ارور سمت سرور" });
      }
    } else {
      res.status(400).json({ message: "لطفا آیدی محصول را وارد نمایید" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "لطفا عکس را به درستی وارد نمایید" });
  }
};

exports.productControllers = {
  createProduct,
  addImage,
  getProductsList,
  getSingleProduct,
  getSimilarProducts
};
