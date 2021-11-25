const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = "./src/public/uploads";
    cb(null, path);
  },
  filename: function (req, file, cb) {
    const nome =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    cb(null, nome);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
