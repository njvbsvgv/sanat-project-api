const ProductPiece = require("../../models/level1/productPiece-model");
const createProductPiece = async (req, res, next) => {
  if (req.body) {
    const { name } = req.body;
    try {
      const newData = new ProductPiece({
        name: name,
      });
      await newData.save();
      return res.status(201).json({ message: "قطعه جدید با موفقیت ساخته شد" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(400).json({ message: "فیلدها خالیست" });
  }
};

const getAllProductPiece = async (req, res, next) => {
  try {
    const allData = await ProductPiece.find();
    return res.status(200).json({ message: "gettedData", data: allData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "ارور سمت سرور", message2: error.message });
  }
};

const getSingleProductPiece = async (req, res, next) => {
    const {id} = req.params;
    console.log("id ==>", id)
    try {
      const findPiece = await ProductPiece.findOne({ _id: id });
      if (findPiece) {
        return res
          .status(200)
          .json({ message: "دیتا یافت شد", data: findPiece });
      } else {
        return res.status(200).json({ message: "دیتایی با این آیدی یافت نشد" });
      }
    } catch (error) {
      return res.status(500).json({ message: "لطفا آیدی را وارد کنید" });
    }
};

module.exports = {
  createProductPiece,
  getAllProductPiece,
  getSingleProductPiece
};
