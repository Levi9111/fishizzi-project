"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const blog_service_1 = require("./blog.service");
const createBlog = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await blog_service_1.BlogServices.createBlogIntoDB(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Blog is created succesfully',
        data: result,
    });
});
const getAllBlogs = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await blog_service_1.BlogServices.getAllBlogsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'All Blogs are fetched succesfully',
        data: result,
    });
});
const getSingleBlog = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await blog_service_1.BlogServices.getBlogByIdFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Blog is fetched succesfully',
        data: result,
    });
});
const updateBlog = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await blog_service_1.BlogServices.updateBlogIntoDB(req.params.id, req.body.Blog);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Blog is updated succesfully',
        data: result,
    });
});
const deleteBlog = (0, catchAsync_1.catchAsync)(async (req, res) => {
    await blog_service_1.BlogServices.deleteBlogFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Blog is deleted succesfully',
    });
});
exports.BlogControllers = {
    getAllBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    getSingleBlog,
};
