const ProductType = require("../../models/level1/productType.model");

const getAllNewsType = async (req, res, next) => {
  try {
    const allData = await ProductType.find();
    return res.status(200).json({ message: "gettedData", data: allData, totalCount: allData.length });
  } catch (error) {
    return res.status(500).json({ message: "ارور سمت سرور" });
  }
};

const getSingleNewsType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findData = await ProductType.findOne({ _id: id });
    if (findData) {
      return res.status(200).json({ message: "دیتا یافت شد", data: findData });
    } else {
      return req.status(200).json({ message: "دیتایی با این آیدی یافت نشد" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "لطفا آیدی را وارد کنید", message2: error.message });
  }
};

module.exports = {
  getAllNewsType,
  getSingleNewsType,
};
