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
exports.ProductsServices = void 0;
const products_model_1 = require("./products.model");
const fileUploader_1 = require("../../utils/fileUploader");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const Querybuilder_1 = __importDefault(require("../../builder/Querybuilder"));
const products_constant_1 = require("./products.constant");
const createProductIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const uploadToCloudinary = yield fileUploader_1.fileUploader.uploadToCloudinary(req.file);
        req.body.product.productImgUrl = uploadToCloudinary.secure_url;
    }
    const { product } = req.body;
    const result = yield products_model_1.Products.create(product);
    return result;
});
const updateProductIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_model_1.Products.findById(id);
    if (!product) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Product not found');
    }
    for (const [key, value] of Object.entries(payload)) {
        product[key] = value;
    }
    const result = yield product.save();
    return result;
});
const getAllProductsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new Querybuilder_1.default(products_model_1.Products.find(), query)
        .search(products_constant_1.productSearchFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    const result = yield (productQuery === null || productQuery === void 0 ? void 0 : productQuery.modelQuery);
    return result;
});
const getProductByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Product not found');
    }
    return result;
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Product not found');
    }
    return result;
});
exports.ProductsServices = {
    createProductIntoDB,
    updateProductIntoDB,
    getAllProductsFromDB,
    getProductByIdFromDB,
    deleteProductFromDB,
};
