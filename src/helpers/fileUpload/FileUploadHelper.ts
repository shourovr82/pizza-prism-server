import multer from "multer";
import path from "path";
import { foodItemStorage, foodMenuStorage, userStorage } from "./FileUploadStorages";

// ! update profile image
const uploadProfileImage = multer({
  storage: userStorage,
  limits: {
    fileSize: 512 * 2 * 1024, // 1MB
  },
  fileFilter(req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const mimetype = fileTypes.test(file.mimetype); // verify file is == filetypes will accept
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase(), // extract the file extension and convert to lowercase
    );
    // if mimetype && extreme are true, then no error
    if (mimetype && extname) {
      return cb(null, true);
    }
    // if mimetype or extname false, it will show an error of compatibility
    return cb(new Error("Only jpeg, jpg and png file will be accepted !!"));
  },
});

// ! create food menu image
const uploadFoodMenuImage = multer({
  storage: foodMenuStorage,
  limits: {
    fileSize: 512 * 2 * 1024, // 1MB
  },
  fileFilter(req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const mimetype = fileTypes.test(file.mimetype); // verify file is == filetypes will accept
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase(), // extract the file extension and convert to lowercase
    );
    // if mimetype && extreme are true, then no error
    if (mimetype && extname) {
      return cb(null, true);
    }
    // if mimetype or extname false, it will show an error of compatibility
    return cb(new Error("Only jpeg, jpg and png file will be accepted !!"));
  },
});
// ! create food Item image
const uploadFoodItemImage = multer({
  storage: foodItemStorage,
  limits: {
    fileSize: 512 * 2 * 1024, // 1MB
  },
  fileFilter(req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const mimetype = fileTypes.test(file.mimetype); // verify file is == filetypes will accept
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase(), // extract the file extension and convert to lowercase
    );
    // if mimetype && extreme are true, then no error
    if (mimetype && extname) {
      return cb(null, true);
    }
    // if mimetype or extname false, it will show an error of compatibility
    return cb(new Error("Only jpeg, jpg and png file will be accepted !!"));
  },
});
export const FileUploadHelper = {
  uploadProfileImage,
  uploadFoodMenuImage,
  uploadFoodItemImage,
};
