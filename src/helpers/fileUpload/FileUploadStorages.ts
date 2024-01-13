import multer from "multer";
// ! user storage
export const userStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "data/uploads/users/");
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + "-" + file.originalname;
    cb(null, uniqueFilename);
  },
});
// ! food menu storage
export const foodMenuStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "data/uploads/food-menu/");
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + "-" + file.originalname;
    cb(null, uniqueFilename);
  },
});
// ! food item storage
export const foodItemStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "data/uploads/food-items/");
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + "-" + file.originalname;
    cb(null, uniqueFilename);
  },
});
