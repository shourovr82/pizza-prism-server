import multer from 'multer';
import path from 'path';

const propertyStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'data/uploads/property/');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + '-' + file.originalname;
    cb(null, uniqueFilename);
  },
});
const userStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'data/uploads/users/');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + '-' + file.originalname;
    cb(null, uniqueFilename);
  },
});
const uploadProfileImage = multer({ storage: userStorage });

// ! update profile image
const uploadUpdatedUserImage = multer({
  storage: userStorage,
  limits: {
    fileSize: 512 * 2 * 1024, // 1MB
  },
  fileFilter(req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const mimetype = fileTypes.test(file.mimetype); // verify file is == filetypes will accept
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase() // extract the file extension and convert to lowercase
    );
    // if mimetype && extreme are true, then no error
    if (mimetype && extname) {
      return cb(null, true);
    }
    // if mimetype or extname false, it will show an error of compatibility
    return cb(new Error('Only jpeg, jpg and png file will be accepted !!'));
  },
});
const uploadPropertyImages = multer({ storage: propertyStorage });

export const FileUploadHelper = {
  uploadProfileImage,
  uploadPropertyImages,
  uploadUpdatedUserImage,
};
