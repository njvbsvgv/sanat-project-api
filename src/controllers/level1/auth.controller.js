const tokenGeneration = require("../../core/utility/tokenGeneration");
const { useUploadVideo } = require("../../core/utility/upload");
const {
  AuthReportModel,
  UserModel,
} = require("../../models/level1/authReport.model");

const addAuthReport = async (req, res, next) => {
  if (req.body) {
    const {
      signUpPageTitle,
      signUpPageDescription,
      signInPageTitle,
      signInPageDescription,
    } = req.body;
    if (
      signUpPageTitle &&
      signUpPageTitle != "" &&
      signUpPageDescription &&
      signUpPageDescription != "" &&
      signInPageTitle &&
      signInPageTitle != "" &&
      signInPageDescription &&
      signInPageDescription != ""
    ) {
      try {
        const signUpBuffer = req.files.signUpVideo[0].buffer;
        const signInBuffer = req.files.signInVideo[0].buffer;

        // آپلود هر ویدیو
        const signUpVideoUrl = await useUploadVideo(signUpBuffer, "uploads");
        const signInVideoUrl = await useUploadVideo(signInBuffer, "uploads");
        await AuthReportModel.updateOne({
          signUp: {
            title: signUpPageTitle,
            description: signUpPageDescription,
            videoSrc: signUpVideoUrl,
          },
          signIn: {
            title: signInPageTitle,
            description: signInPageDescription,
            videoSrc: signInVideoUrl,
          },
        });
        // const newData = new AuthReportModel({
        //   signUp: {
        //     title: signUpPageTitle,
        //     description: signUpPageDescription,
        //     videoSrc: signUpVideoUrl,
        //   },
        //   signIn: {
        //     title: signInPageTitle,
        //     description: signInPageDescription,
        //     videoSrc: signInVideoUrl,
        //   },
        // });
        // await newData.save();
        return res.status(201).json({ message: "اطلاعات با موفقیت آپدیت شد" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "ارور سمت سرور", message2: error.message });
      }
    } else {
      return res
        .status(400)
        .json({ message: "فیلدها خالیت، لطفا تمامی فیلدها را با دقت پرکنید" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "فیلدها خالیت، لطفا تمامی فیلدها را با دقت پرکنید" });
  }
};

const getAuthReport = async (req, res, next) => {
  try {
    const reportData = await AuthReportModel.findOne();
    return res.status(200).json({ data: reportData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "ارور سمت سرور", message2: error.message });
  }
};

const signUp = async (req, res, next) => {
  if (req.body) {
    const { emailOrPhoneNumber, password, confirmPassword } = req.body;
    try {
      if (
        emailOrPhoneNumber &&
        emailOrPhoneNumber != "" &&
        password &&
        password != "" &&
        confirmPassword &&
        confirmPassword != ""
      ) {
        const findUser = await UserModel.findOne({
          emailOrPhoneNumber: emailOrPhoneNumber,
        });
        if (findUser) {
          return res
            .status(400)
            .json({ message: "این ایمیل یا شماره همراه قبلا ثبت نام شده است" });
        } else {
          const newUser = new UserModel({
            emailOrPhoneNumber,
            password,
            confirmPassword,
            role: ["user"],
          });
          await newUser.save();
          return res
            .status(201)
            .json({ message: "ثبت نام شما با موفقیت انجام شد" });
        }
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "ارور سمت سرور", message2: error.message });
    }
  } else {
    return res
      .status(400)
      .json({ message: "فیلدها خالیست، لطفا تمامی فیلدها را با دقت پرکنید" });
  }
};

const signIn = async (req, res, next) => {
  if (req.body) {
    const { emailOrPhoneNumber, password } = req.body;
    if (
      emailOrPhoneNumber &&
      emailOrPhoneNumber != "" &&
      password &&
      password != ""
    ) {
      try {
        const findUser = await UserModel.findOne({
          emailOrPhoneNumber: emailOrPhoneNumber,
        });
        if (findUser) {
          const token = tokenGeneration({
            id: findUser._id,
            userName: findUser.emailOrPhoneNumber,
            role: findUser.role,
          });
          return res.status(200).json({ token: token });
        } else {
          return res.status(401).json({ message: "کاربر یافت نشد" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({
            message:
              "اروری سمت سرور پیش اومده، لطفا بعد چند ثانیه مجدد امتحان کنید",
            message2: error.message,
          });
      }
    } else {
      return res
        .status(400)
        .json({ message: "فیلدها خالیست، لطفا تمامی فیلدها را پر کنید" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "فیلدها خالیست، لطفا تمامی فیلدها را پر کنید" });
  }
};

module.exports = { addAuthReport, getAuthReport, signUp, signIn };
