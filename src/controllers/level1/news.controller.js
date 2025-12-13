const NewsModel = require("../../models/level1/createNews.model");
const {
  dataValidationMethode,
  dataValidationFn,
} = require("../../core/utility/dataValidationMethode");
const { dateGenerator } = require("../../core/utility/date-generator");

const createNews = async (req, res, nex) => {
  if (req.body) {
    const {
      title,
      googleTitle,
      description,
      studyTime,
      categoriesList,
      titleCategories,
      rating,
    } = req.body;
    if (
      title != "" &&
      googleTitle != "" &&
      description != "" &&
      studyTime != "" &&
      categoriesList.length != 0 &&
      titleCategories != ""
    ) {
      const newNews = new NewsModel({
        title,
        titleCategories,
        description,
        googleTitle,
        updateAt: dateGenerator(),
        createAt: dateGenerator(),
        categoriesList,
        studyTime,
        newsItems: null,
        rating,
      });
      await newNews.save();
      return res.status(200).json({ message: "مقاله جدید با موفقیت ساخته شد" });
    } else {
      return res
        .status(400)
        .json({ message: "لطفا تمامی فیلدها را با دقت پر کنید" });
    }
  } else {
    return res.status(400).json({ message: "فیلدها خالیست" });
  }
};

const getAllNews = async (req, res, next) => {
  try {
    const { RowsOfPage, Rating } = req.query;
    let allData;
    if (Rating && Rating != "") {
      allData = await NewsModel.find({rating: Rating});
    }else {
        allData = await NewsModel.find();
    }
    const slicedData = allData.slice(0, RowsOfPage);
    return res.status(200).json({
      message: "gettedData",
      data: RowsOfPage != "" ? slicedData : allData,
      totalCount: RowsOfPage != "" ? slicedData.length : allData.length,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "ارور سمت سرور", message2: error.message });
  }
};

module.exports = {
  createNews,
  getAllNews,
};
