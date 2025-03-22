import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(req);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog is created succesfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Blogs are fetched succesfully',
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.getBlogByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog is fetched succesfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.updateBlogIntoDB(
    req.params.id,
    req.body.Blog,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog is updated succesfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  await BlogServices.deleteBlogFromDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog is deleted succesfully',
  });
});

export const BlogControllers = {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
};
