"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
// Todo: replace secrets
cloudinary_1.v2.config({
    cloud_name: 'drh6r56bb',
    api_key: '748277839385856',
    api_secret: 'yZlc6VKTsmu3Nh-aXevWjqZa5iE',
});
const uploadToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload(file.path, {
            public_id: file.originalname,
        })
            .then((uploadResult) => {
            resolve(uploadResult);
            fs_1.default.unlinkSync(file.path);
        })
            .catch((error) => {
            console.error('Cloudinary Upload Error :', error);
            reject(error);
        });
    });
};
// Multer file upload
const storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, path_1.default.join(process.cwd(), 'uploads'));
    },
    filename: function (_req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
exports.fileUploader = {
    upload,
    uploadToCloudinary,
};
