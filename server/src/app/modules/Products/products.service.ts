/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { TProduct } from './products.interface';
import { Products } from './products.model';
import { fileUploader } from '../../../helpers/fileUploader';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/Querybuilder';

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
  console.log(query);
  const productQuery = new QueryBuilder(Products.find(), query)
    .search(['name', 'category'])
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await productQuery?.modelQuery;
  console.log(result);
  return result;
};

const getProductByIdFromDB = async (id: string) => {
  const product = await Products.findById(id);

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  const result = await Products.findById(id);

  return result;
};

const deleteProductFromDB = async (id: string) => {
  const product = await Products.findById(id);

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  const result = await Products.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );

  return result;
};

export const ProductsServices = {
  createProductIntoDB,
  updateProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  deleteProductFromDB,
};
