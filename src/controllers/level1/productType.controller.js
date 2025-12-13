const ProductType = require("../../models/level1/productType.model");

const createProductType = async (req, res, next) => {
  if (req.body) {
    const { name } = req.body;
    if (name != "") {
      const newData = new ProductType({
        name: name,
      });
      await newData.save();
      return res.status(201).json({ message: "نوع جدید با موفقیت ساخته شد" });
    } else {
      return res
        .status(400)
        .json({ message: "لطفا تمامی فیلدهارا با دفت پرکنید" });
    }
  } else {
    return res.status(400).json({ message: "فیلدها خالیست" });
  }
};

const getAllProductType = async (req, res, next) => {
  try {
    const allData = await ProductType.find();
    return res.status(200).json({ message: "gettedData", data: allData, totalCount: allData.length });
  } catch (error) {
    return res.status(500).json({ message: "ارور سمت سرور" });
  }
};

const getSingleProductType = async (req, res, next) => {
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


const deleteProductType = async (req, res, next) => {
  try {
    const { id } = req.params
    await ProductType.deleteOne({_id: id})
    return res.status(200).json({ message: "نوع مورد نظر با موفقیت حذف شد" })
  }catch (error) {
    return res.status(500).json({ message: "ارور سمت سرور", message2: error.message })
  }
}

module.exports = {
  createProductType,
  getAllProductType,
  getSingleProductType,
  deleteProductType
};
