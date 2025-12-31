// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../../uploads"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (allowedTypes.test(ext)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// const getImageUrl = (req, file) => {
//   const url = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
//   return url;
// };

// module.exports = { upload, getImageUrl };



// const multer = require("multer");

// const storage = multer.memoryStorage(); // فایل در حافظه نگه داشته می‌شود
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (allowedTypes.test(ext)) cb(null, true);
//   else cb(new Error("Only images are allowed"), false);
// };

// const upload = multer({ storage, fileFilter });

// module.exports = { upload };



const cloudinary = require("../utility/cloudinary");

/**
 * آپلود یک فایل به Cloudinary و برگرداندن URL
 * @param {Buffer} fileBuffer - فایل به صورت Buffer (multer.memoryStorage)
 * @param {String} folder - پوشه مورد نظر در Cloudinary
 * @returns {Promise<String>} - URL تصویر آپلود شده
 */
const useUploadImage = async (fileBuffer, folder = "uploads") => {
  if (!fileBuffer) throw new Error("No file provided");

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};



const uploadImageController = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "هیچ فایلی ارسال نشده" });

    const imageUrl = await useUploadImage(req.file.buffer, "news"); // هوک صدا زده می‌شود

    res.status(201).json({
      message: "تصویر با موفقیت آپلود شد",
      url: imageUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطا در آپلود تصویر", error: error.message });
  }
};



const useUploadVideo = async (fileBuffer, folder = "uploads") => {
  if (!fileBuffer) throw new Error("No file provided");

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "video" }, // این خط مهمه برای ویدیو
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

module.exports = {useUploadImage, uploadImageController, useUploadVideo};
