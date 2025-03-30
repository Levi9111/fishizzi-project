"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsServices = void 0;
const products_model_1 = require("./products.model");
const fileUploader_1 = require("../../utils/fileUploader");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const Querybuilder_1 = __importDefault(require("../../builder/Querybuilder"));
const products_constant_1 = require("./products.constant");
const createProductIntoDB = async (req) => {
    if (req.file) {
        const uploadToCloudinary = await fileUploader_1.fileUploader.uploadToCloudinary(req.file);
        req.body.product.productImgUrl = uploadToCloudinary.secure_url;
    }
    const { product } = req.body;
    const result = await products_model_1.Products.create(product);
    return result;
};
const updateProductIntoDB = async (id, payload) => {
    const product = await products_model_1.Products.findById(id);
    if (!product) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Product not found');
    }
    for (const [key, value] of Object.entries(payload)) {
        product[key] = value;
    }
    const result = await product.save();
    return result;
};
const getAllProductsFromDB = async (query) => {
    const productQuery = new Querybuilder_1.default(products_model_1.Products.find(), query)
        .search(products_constant_1.productSearchFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    const result = await productQuery?.modelQuery;
    return result;
};
const getProductByIdFromDB = async (id) => {
    const result = await products_model_1.Products.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Product not found');
    }
    return result;
};
const deleteProductFromDB = async (id) => {
    const result = await products_model_1.Products.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Product not found');
    }
    return result;
};
exports.ProductsServices = {
    createProductIntoDB,
    updateProductIntoDB,
    getAllProductsFromDB,
    getProductByIdFromDB,
    deleteProductFromDB,
};
