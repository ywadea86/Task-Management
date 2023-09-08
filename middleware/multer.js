const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Define the file name
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10MB file size limit
  fileFilter: (req, file, cb) => {
    // Define allowed file types
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'video/mp4'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  },
});

module.exports = upload;
