const LandingReport = require("../../models/level1/landingReport-models");

const landingReportController = async (req, res, next) => {
  try {
    const newData = await LandingReport.findOne();
    return res.json({ message: "report getting", data: newData });
  } catch (error) {
    return res.status(500).json({ message: "ارور سمت سرور" });
  }
};

const updateReport = async (req, res, next) => {
  try {
    if (req.body) {
      const {
        headingText,
        aboutProducts,
        singleQuestion,
        ourPositivePoints,
        aboutMeAndMyWork,
        frequentlyAskedQuestions,
      } = req.body;
      if (
        headingText.title !== "" &&
        aboutProducts.startTitle !== "" &&
        aboutProducts.endTitle !== "" &&
        headingText.description !== "" &&
        aboutProducts.clicheTitle !== "" &&
        aboutProducts.description !== "" &&
        aboutProducts.products !== "" &&
        singleQuestion.question !== "" &&
        singleQuestion.answerToTheQuestion !== "" &&
        ourPositivePoints.title !== "" &&
        ourPositivePoints.tips !== "" &&
        aboutMeAndMyWork.aboutMe.title !== "" &&
        aboutMeAndMyWork.aboutMe.description !== "" &&
        aboutMeAndMyWork.myWork.yearsOfActivity !== "" &&
        aboutMeAndMyWork.myWork.OrganicMeat !== "" &&
        aboutMeAndMyWork.myWork.authenticBrand !== "" &&
        frequentlyAskedQuestions !== ""
      ) {
        if (
          !Array.isArray(aboutProducts.products) ||
          !Array.isArray(ourPositivePoints.tips) ||
          !Array.isArray(frequentlyAskedQuestions)
        ) {
          return res.status(400).json({
            message:
              "مقادیر products - tips - frequentlyAskedQuestions باید لیست باشند!!! ",
          });
        } else {
          if (
            aboutProducts.products.length <= 4 &&
            ourPositivePoints.tips.length <= 4 &&
            frequentlyAskedQuestions.length <= 4
          ) {
            await LandingReport.updateOne({
              headingText: {
                title: headingText.title,
                startTitle: headingText.startTitle,
                clicheTitle: headingText.clicheTitle,
                endTitle: headingText.endTitle,
                description: headingText.description,
              },
              aboutProducts: {
                title: aboutProducts.title,
                descrption: aboutProducts.descrption,
                products: aboutProducts.products,
              },
              singleQuestion: {
                question: singleQuestion.question,
                answerToTheQuestion: singleQuestion.answerToTheQuestion,
              },
              ourPositivePoints: {
                title: ourPositivePoints.title,
                tips: ourPositivePoints.tips,
              },
              aboutMeAndMyWork: {
                aboutMe: {
                  title: aboutMeAndMyWork.aboutMe.title,
                  description: aboutMeAndMyWork.aboutMe.description,
                },
                myWork: {
                  yearsOfActivity: aboutMeAndMyWork.myWork.yearsOfActivity,
                  OrganicMeat: aboutMeAndMyWork.myWork.OrganicMeat,
                  authenticBrand: aboutMeAndMyWork.myWork.authenticBrand,
                },
              },
              frequentlyAskedQuestions: frequentlyAskedQuestions
            });
            return res.status(200).json({
              message: "آپدیت انجام شد",
              data: {
                headingText,
                aboutProducts,
                singleQuestion,
                ourPositivePoints,
                aboutMeAndMyWork,
                frequentlyAskedQuestions,
              },
            });
          } else {
            return res
              .status(400)
              .json({
                message:
                  "تعداد سوالات متداول باید 4 تا باشد - تعداد محصولات تاپبک باید 4 تا باشد و تعداد تیپس هم باید 4 تا باشد",
              });
          }
        }
      } else {
        return res
          .status(400)
          .json({ message: "لطفا تمامی فیلدها را با دفت پرکنید" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "ارور سمت سرور" });
  }
};

exports.landingReportController = {
  landingReportController,
  updateReport,
};
