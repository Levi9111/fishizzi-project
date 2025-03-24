"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const createBlogIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const uploadToCloudinary = yield fileUploader_1.fileUploader.uploadToCloudinary(req.file);
        req.body.blog.blogImgUrl = uploadToCloudinary.secure_url;
    }
    const { blog } = req.body;
    const result = yield blog_model_1.Blog.create(blog);
    return result;
});
const updateBlogIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById(id);
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    for (const [key, value] of Object.entries(payload)) {
        blog[key] = value;
    }
    const result = yield blog.save();
    return result;
});
const getAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new Querybuilder_1.default(blog_model_1.Blog.find(), query)
        .search(['title'])
        .filter()
        .sort()
        .fields()
        .paginate();
    const result = yield (blogQuery === null || blogQuery === void 0 ? void 0 : blogQuery.modelQuery);
    return result;
});
const getBlogByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById(id);
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    return blog;
});
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    return blog;
});
exports.BlogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
    getAllBlogsFromDB,
    getBlogByIdFromDB,
    deleteBlogFromDB,
};
