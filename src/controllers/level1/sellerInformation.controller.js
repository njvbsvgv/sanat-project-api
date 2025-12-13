const Information = require("../../models/level1/information-model");

const addInformation = async (req, res, next) => {
  if (req.body) {
    const { homePhone, phoneNumber, address } = req.body;
    if (homePhone !== "" && phoneNumber !== "" && address !== "") {
      if (phoneNumber.length > 3) {
        return res
          .status(400)
          .json({ message: "شماره تلفن حداکثر باید سه تا باشد" });
      } else {
        const updated = await Information.updateOne({
          homePhone: homePhone,
          phoneNumber: phoneNumber,
          address: address,
        });
        return res.status(200).json({
          message: updated.acknowledged
            ? "اطلاعات جدید اضافه شد"
            : "عملیات با خطا مواجه شد، لطفا مجدد امتحان کنید",
        });
      }
    } else {
      res.status(400).json({ message: "لطفا تمامی فیلدهارا با دقت پرکنید" });
    }
  } else {
    return res.status(400).json({ message: "فیلدها خالیست" });
  }
};

const getInformation = async (req, res, next) => {
  try {
    const informationData = await Information.findOne();
    return res.status(200).json({ data: informationData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "مشکلی پیش اومده لطفا مجدد امتحان کنید" });
  }
};

module.exports = {
  addInformation,
  getInformation,
};
