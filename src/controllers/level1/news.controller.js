const NewsModel = require("../../models/level1/createNews.model");
const ProductType = require("../../models/level1/productType.model");
const {
  dataValidationMethode,
  dataValidationFn,
} = require("../../core/utility/dataValidationMethode");
const { dateGenerator } = require("../../core/utility/date-generator");
const getImageUrl = require("../../core/utility/upload");

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
        image: [],
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

const createNewsItem = async (req, res, next) => {
  if (req.body) {
    const { NewsId } = req.params;
    const { title, miniDescription } = req.body;
    const image = getImageUrl.getImageUrl(req, req.file);
    console.log(image, title, miniDescription);
    if (title && title != "" && miniDescription && miniDescription != "") {
      const newsData = await NewsModel.findOne({ _id: NewsId });
      await NewsModel.updateOne(
        { _id: NewsId },
        {
          $set: {
            image: newsData.image,
            title: newsData.title,
            googleTitle: newsData.googleTitle,
            description: newsData.description,
            studyTime: newsData.studyTime,
            rating: newsData.rating,
            titleCategories: newsData.titleCategories,
            createAt: newsData.createAt,
            updateAt: newsData.updateAt,
            categoriesList: newsData.categoriesList,
            newsItems: [
              {
                image: image,
                title: title,
                miniDescribe: miniDescription,
              },
            ],
          },
        }
      );
      const updateData = await NewsModel.findOne({ _id: NewsId });
      return res
        .status(201)
        .json({ message: "اطلاعات با موفقیت اضافه شد", data: updateData });
    } else {
      return res
        .status(400)
        .json({ message: "لطفا تمامی فیلدها را با دفت پر گنید" });
    }
  } else {
    return res.status(400).json({ message: "فیلدها خالیست" });
  }
};

const getAllNews = async (req, res, next) => {
  try {
    const { RowsOfPage, TypeId } = req.query;
    let fullData;
    const findData = await NewsModel.find();
    let filteredData = null;
    if (TypeId && TypeId != "") {
      const findType = await ProductType.findOne({ _id: TypeId });
      filteredData = findData.filter((el) =>
        el.categoriesList.includes(findType.name)
      );
    }

    if (filteredData && RowsOfPage && RowsOfPage != "") {
      filteredData = filteredData.slice(0, RowsOfPage);
    } else if (RowsOfPage && RowsOfPage != "") {
      filteredData = findData.slice(0, RowsOfPage);
    }

    if (filteredData) {
      return res
        .status(200)
        .json({ data: filteredData, totalCount: filteredData.length });
    } else {
      return res
        .status(200)
        .json({ data: findData, totalCount: findData.length });
    }
  } catch (error) {
    return res.status(500).json({ message: "ارور سمت سرور" });
  }
};

const getTopNews = async (req, res, next) => {
  try {
    let newsData = await NewsModel.find();
    newsData = newsData.filter((el) => Number(el.studyTime) <= 5);
    // const randomNum = Math.round(Math.random())*newsData.length - 1
    // const startIndex = randomNum >= 3 ? randomNum - 3 : 0
    newsData = newsData.slice(0, 3);
    return res
      .status(200)
      .json({ data: newsData, totalCount: newsData.length });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "ارور سمت سرور", message2: error.message });
  }
};

const getNewsByRate = async (req, res, next) => {
  try {
    const fullData = await NewsModel.find({ rating: "4" });
    return res
      .status(200)
      .json({ data: fullData, totalCount: fullData.length });
  } catch (error) {
    return res.status(500).json({ message: "ارور سمت سرور" });
  }
};

const getSingleNews = async (req, res, next) => {
  try {
    const { newsId } = req.params;
    const findData = await NewsModel.findOne({ _id: newsId });
    if (findData) {
      return res.status(200).json({ data: findData });
    } else {
      return res.status(200).json({ message: "دیتا یافت نشد" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "ارور سمت سرور", message2: error.message });
  }
};

module.exports = {
  createNews,
  createNewsItem,
  getAllNews,
  getTopNews,
  getNewsByRate,
  getSingleNews,
};
