const ExportingCountry = require("../../models/level1/exportingCountry.model");

const createExportingCountry = async (req, res, next) => {
  if (req.body) {
    const { name } = req.body;
    if (name != "") {
      try {
        const newData = new ExportingCountry({
          name: name,
        });
        await newData.save();
        return res
          .status(201)
          .json({ message: "کشور صادرکننده با موفقیت ساخته شد" });
      } catch (error) {
        return res.status(500).json({ message: "ارور سمت سرور" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "لطفا تمامی فیلدها را بادقت پرکنید" });
    }
  } else {
    return res.status(400).json({ message: "فیلدها خالیست" });
  }
};

const getAllExportingCountry = async (req, res, next) => {
  try {
    const allData = await ExportingCountry.find();
    return res.status(200).json({ message: "gettedData", data: allData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "ارور سمت سرور", message2: error.message });
  }
};

const getSingleExportingCountry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findData = await ExportingCountry.findOne({ _id: id });
    if (findData) {
      return res.status(200).json({ message: "دیتا یافت شد", data: findData });
    } else {
      return res.status(200).json({ message: "دیتایی یافت نشد" });
    }
  } catch (error) {
    return res.status(500).json({ message: "لطفا آیدی را وارد کنید" });
  }
};

module.exports = {
  createExportingCountry,
  getAllExportingCountry,
  getSingleExportingCountry
};
