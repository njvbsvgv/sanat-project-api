const Users = require("../../models/level1/login-model");
const dataValidationMethode = require("../../core/utility/dataValidationMethode");

const login = async (req, res, next) => {
  if (req.body) {
    const { nationalCode, password } = req.body;
    const validation = dataValidationMethode([nationalCode, password]);
    if (validation) {
      const findUser = await Users.findOne({ nationalCode: nationalCode });
      if (findUser) {
        if (findUser.password === password) {
          return res.status(200).json({ message: "خوش آمدید" });
        } else {
          return res.status(400).json({ message: "پسوورد اشتباه است" });
        }
      } else {
        return res.status(400).json({ message: "کاربر موردنظر یافت نشد" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "لطفا تمامی فیلدها را با دقت پر کنید" });
    }
  }
};

exports.loginController = login;
