/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { TProduct } from './products.interface';
import { Products } from './products.model';
import { fileUploader } from '../../utils/fileUploader';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/Querybuilder';
import { productSearchFields } from './products.constant';

const createProductIntoDB = async (req: Request) => {
  if (req.file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(req.file);
    req.body.product.productImgUrl = uploadToCloudinary.secure_url;
  }

  const { product } = req.body;

  const result = await Products.create(product);
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const product = await Products.findById(id);
  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  for (const [key, value] of Object.entries(payload)) {
    (product as any)[key] = value;
  }

  const result = await product.save();
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Products.find(), query)
    .search(productSearchFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await productQuery?.modelQuery;
  return result;
};

const getProductByIdFromDB = async (id: string) => {
  const result = await Products.findById(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Products.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  return result;
};

export const ProductsServices = {
  createProductIntoDB,
  updateProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  deleteProductFromDB,
};
