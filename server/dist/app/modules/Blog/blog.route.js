"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const fileUploader_1 = require("../../utils/fileUploader");
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const router = (0, express_1.Router)();
router.post('/create-blog', fileUploader_1.fileUploader.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(blog_validation_1.BlogValidations.createBlogValidationSchema), blog_controller_1.BlogControllers.createBlog);
router.patch('/update-blog/:id', (0, validateRequest_1.default)(blog_validation_1.BlogValidations.updateBlogValidationSchema), blog_controller_1.BlogControllers.updateBlog);
router.get('/', blog_controller_1.BlogControllers.getAllBlogs);
router.get('/:id', blog_controller_1.BlogControllers.getSingleBlog);
router.delete('/:id', blog_controller_1.BlogControllers.deleteBlog);
exports.BlogRoutes = router;
