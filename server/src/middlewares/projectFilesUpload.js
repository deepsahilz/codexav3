import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'thumbnail') {
      cb(null, 'uploads/projects/thumbnails/');
    } else if (file.fieldname === 'mediaFiles') {
      cb(null, 'uploads/projects/media/');
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const projectFilesUpload = multer({ storage }).fields([
  { name: 'thumbnail', maxCount: 1 },   
  { name: 'mediaFiles', maxCount: 10 }  
]);

export default projectFilesUpload;
