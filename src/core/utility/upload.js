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



// const useUploadImage = async (fileBuffer, folder = "uploads") => {
//   if (!fileBuffer) throw new Error("No file provided");

//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result.secure_url);
//       }
//     );
//     stream.end(fileBuffer);
//   });
// };



// const uploadImageController = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "هیچ فایلی ارسال نشده" });

//     const imageUrl = await useUploadImage(req.file.buffer, "news"); // هوک صدا زده می‌شود

//     res.status(201).json({
//       message: "تصویر با موفقیت آپلود شد",
//       url: imageUrl,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "خطا در آپلود تصویر", error: error.message });
//   }
// };



// const useUploadVideo = async (fileBuffer, folder = "uploads") => {
//   if (!fileBuffer) throw new Error("No file provided");

//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder, resource_type: "video" }, // این خط مهمه برای ویدیو
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result.secure_url);
//       }
//     );
//     stream.end(fileBuffer);
//   });
// };

// module.exports = {useUploadImage, uploadImageController, useUploadVideo};


// import multer from "multer";
// const s3 = require("../config/arvan-config")

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
//   fileFilter(req, file, cb) {
//     if (!file.mimetype.startsWith("image/")) {
//       cb(new Error("فقط عکس مجازه"));
//     }
//     cb(null, true);
//   },
// });


// import sharp from "sharp";

// const processedImage = await sharp(req.file.buffer)
//   .resize({ width: 800 })
//   .jpeg({ quality: 80 })
//   .toBuffer();

// const fileName = `images/${Date.now()}.jpg`;

// await s3.upload({
//   Bucket: process.env.ARVAN_BUCKET,
//   Key: fileName,
//   Body: processedImage,
//   ContentType: "image/jpeg",
//   ACL: "public-read",
// }).promise();


// const uploadMedia = () => {
  
// }



const sharp = require("sharp");
const s3 = require("../config/arvan-config")

/**
 * آپلود فایل مدیا (عکس یا ویدئو) به ArvanCloud
 * @param {Buffer} fileBuffer - فایل اصلی
 * @param {string} fileName - نام فایل نهایی (با پسوند)
 * @param {string} mimeType - نوع فایل (ContentType)
 * @param {Object} options - گزینه‌های اضافی
 * @returns {Promise<string>} URL فایل
 */
async function uploadMedia(fileBuffer, fileName, mimeType, options = {}) {
  let bufferToUpload = fileBuffer;

  // اگر عکس هست، resize و compress کن
  if (mimeType.startsWith("image/")) {
    const width = options.width || 800;
    const quality = options.quality || 80;

    bufferToUpload = await sharp(fileBuffer)
      .resize({ width })
      .jpeg({ quality })
      .toBuffer();
  }

  const params = {
    Bucket: process.env.ARVAN_BUCKET,
    Key: fileName,
    Body: bufferToUpload,
    ContentType: mimeType,
    ACL: "public-read",
  };

  await s3.upload(params).promise();

  return `${process.env.ARVAN_ENDPOINT}/${process.env.ARVAN_BUCKET}/${fileName}`;
}

module.exports = uploadMedia
