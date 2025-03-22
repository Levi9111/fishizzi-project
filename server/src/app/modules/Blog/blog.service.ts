/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { fileUploader } from '../../utils/fileUploader';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/Querybuilder';
import { Blog } from './blog.model';
import { TBlog } from './blog.interface';

const createBlogIntoDB = async (req: Request) => {
  if (req.file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(req.file);
    req.body.blog.blogImgUrl = uploadToCloudinary.secure_url;
  }

  const { blog } = req.body;

  const result = await Blog.create(blog);
  return result;
};

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  for (const [key, value] of Object.entries(payload)) {
    (blog as any)[key] = value;
  }

  const result = await blog.save();
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(['title'])
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await blogQuery?.modelQuery;
  return result;
};

const getBlogByIdFromDB = async (id: string) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  return blog;
};

const deleteBlogFromDB = async (id: string) => {
  const blog = await Blog.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  return blog;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  getAllBlogsFromDB,
  getBlogByIdFromDB,
  deleteBlogFromDB,
};
