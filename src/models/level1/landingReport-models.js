const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const type = {type: String, required: true}

const landingReportSchema = new Schema({
  headingText: {
    title: type,
    startTitle: type,
    clicheTitle: type,
    endTitle: type,
    description: type,
  },
  aboutProducts: {
    title: type,
    descrption: type,
    products: [{title: type, description: type}],
  },
  singleQuestion: {
    question: type,
    answerToTheQuestion: type,
  },
  ourPositivePoints: {
    title: type,
    tips: [{ tipsTitle: type, tipsDescription: type }],
  },
  aboutMeAndMyWork: {
    aboutMe: {
      companyName: type,
      title: type,
      description: type,
    },
    myWork: {
      yearsOfActivity: type,
      OrganicMeat: type,
      authenticBrand: type,
    },
  },
  frequentlyAskedQuestions: [{ question: type, answerToTheQuestion: type }],
});


module.exports = mongoose.model("landingreport", landingReportSchema)
