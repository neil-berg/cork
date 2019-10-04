const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 15000000 // 15 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only JPG, JPEG, and PNG files are allowed'));
    }

    cb(undefined, true);
  }
});

module.exports = upload;
