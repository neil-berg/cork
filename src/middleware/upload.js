const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 100000
  },
  fileFilter(req, file, cb) {
    console.log(file);
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only JPG, JPEG, and PNG files are allowed'));
    }

    cb(undefined, true);
  }
});

module.exports = upload;
