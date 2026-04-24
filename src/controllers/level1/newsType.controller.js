const NewsTypeModel = require("../../models/level1/newsType.model");


const createNewsType = async (req, res, next) => {
  if (req.body) {
    const { name } = req.body
    const newType = new NewsTypeModel({
      name: name
    })
    await newType.save()
    return res.status(201).json({ message: "نوع جدید با موفقیت ساخته شد" })
  }else {
    return res.status(400).json({ message: "فیلدها خالیست لطفا تمامی فیلدها را با دقت پرکنید" })
  }
}

const getAllNewsType = async (req, res, next) => {
  try {
    const allData = await NewsTypeModel.find();
    return res.status(200).json({ message: "gettedData", data: allData, totalCount: allData.length });
  } catch (error) {
    return res.status(500).json({ message: "ارور سمت سرور" });
  }
};

const getSingleNewsType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findData = await NewsTypeModel.findOne({ _id: id });
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
  createNewsType
};
