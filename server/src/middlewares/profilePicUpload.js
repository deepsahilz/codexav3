import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer storage for avatar uploads
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/avatars';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename with username and timestamp
    const uniqueSuffix = `${req.user.username}-${Date.now()}`;
    const fileExt = path.extname(file.originalname);
    cb(null, `avatar-${uniqueSuffix}${fileExt}`);
  }
});

// Set up file filter to allow only images
const imageFileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|webp|svg|bmp|tiff|heic|avif|jfif/;

  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

// Create and export the upload middleware
export const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: imageFileFilter
}).single('file');

// Helper function to handle file upload with promise interface
export const handleProfilePicUpload = (req, res) => {
  return new Promise((resolve, reject) => {
    uploadAvatar(req, res, (err) => {
      if (err) {
        // Handle multer errors
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return reject('File size too large. Maximum size is 5MB');
          }
          return reject(err.message);
        }
        return reject(err.message);
      }
      resolve();
    });
  });
};

// Helper function to delete file
export const deleteFile = (filePath) => {
  if (!filePath) return;
  
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};