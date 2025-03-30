"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const products_service_1 = require("./products.service");
const createProduct = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await products_service_1.ProductsServices.createProductIntoDB(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Product is created succesfully',
        data: result,
    });
});
const getAllProducts = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await products_service_1.ProductsServices.getAllProductsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'All products are fetched succesfully',
        data: result,
    });
});
const getSingleProduct = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await products_service_1.ProductsServices.getProductByIdFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Product is fetched succesfully',
        data: result,
    });
});
const updateProduct = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await products_service_1.ProductsServices.updateProductIntoDB(req.params.id, req.body.product);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Product is updated succesfully',
        data: result,
    });
});
const deleteProduct = (0, catchAsync_1.catchAsync)(async (req, res) => {
    await products_service_1.ProductsServices.deleteProductFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Product is deleted succesfully',
    });
});
exports.ProductsControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
