const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (
    !(extension === ".jpg" || extension === ".jpeg" || extension === ".png")
  ) {
    cb(new Error("Unsupported file!"));
    return;
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;