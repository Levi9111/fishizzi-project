"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogServices = void 0;
const fileUploader_1 = require("../../utils/fileUploader");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const Querybuilder_1 = __importDefault(require("../../builder/Querybuilder"));
const blog_model_1 = require("./blog.model");
const createBlogIntoDB = async (req) => {
    if (req.file) {
        const uploadToCloudinary = await fileUploader_1.fileUploader.uploadToCloudinary(req.file);
        req.body.blog.blogImgUrl = uploadToCloudinary.secure_url;
    }
    const { blog } = req.body;
    const result = await blog_model_1.Blog.create(blog);
    return result;
};
const updateBlogIntoDB = async (id, payload) => {
    const blog = await blog_model_1.Blog.findById(id);
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    for (const [key, value] of Object.entries(payload)) {
        blog[key] = value;
    }
    const result = await blog.save();
    return result;
};
const getAllBlogsFromDB = async (query) => {
    const blogQuery = new Querybuilder_1.default(blog_model_1.Blog.find(), query)
        .search(['title'])
        .filter()
        .sort()
        .fields()
        .paginate();
    const result = await blogQuery?.modelQuery;
    return result;
};
const getBlogByIdFromDB = async (id) => {
    const blog = await blog_model_1.Blog.findById(id);
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    return blog;
};
const deleteBlogFromDB = async (id) => {
    const blog = await blog_model_1.Blog.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    return blog;
};
exports.BlogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
    getAllBlogsFromDB,
    getBlogByIdFromDB,
    deleteBlogFromDB,
};
