const Location = require("../../models/level1/location-model");

const addLocation = async (req, res, next) => {
  if (req.body) {
    const { locationLat, locationLon } = req.body;
    if (locationLat !== "" && locationLon !== "") {
      const updates = await Location.updateOne({
        locationLat: locationLat,
        locationLon: locationLon,
      });
      return res.status(updates.acknowledged ? 200 : 401).json({
        data: updates.acknowledged
          ? "آپدیت انجام شد"
          : "عملیات با خطا مواجه شد، لطفا مجدد امتحان کنید",
      });
    } else {
      return res.status(400).json({ message: "لطفا تمامی فیلدهارا پر کنید" });
    }
  } else {
    return res.status(400).json({ message: "لطفا تمامی فیلدهارا پر کنید" });
  }
};

const getLocation = async (req, res, next) => {
  try {
    const data = await Location.findOne();
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: "ارور سمت سرور" });
  }
};

module.exports = {
  addLocation,
  getLocation,
};
