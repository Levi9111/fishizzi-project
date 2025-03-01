import multer from 'multer';
import fs from 'fs';
import path from 'path';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

// Todo: replace secrets
cloudinary.config({
  cloud_name: 'drh6r56bb',
  api_key: '748277839385856',
  api_secret: 'yZlc6VKTsmu3Nh-aXevWjqZa5iE',
});

const uploadToCloudinary = async (
  file: Express.Multer.File,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(file.path, {
        public_id: file.originalname,
      })
      .then((uploadResult) => {
        resolve(uploadResult);
        fs.unlinkSync(file.path);
      })
      .catch((error: UploadApiErrorResponse) => {
        console.log('Cloudinary Upload Error :', error);
        reject(error);
      });
  });
};

// Multer file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
