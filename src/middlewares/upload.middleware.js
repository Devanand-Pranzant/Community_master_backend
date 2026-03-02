// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowed = ["image/png", "image/jpeg", "image/webp"];
//   if (allowed.includes(file.mimetype)) cb(null, true);
//   else cb(new Error("Only PNG, JPG, WEBP allowed"), false);
// };

// module.exports = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter,
// });












//================
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Absolute path to root uploads folder
const uploadPath = path.resolve(__dirname, "../../uploads");

// Create folder if not exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;