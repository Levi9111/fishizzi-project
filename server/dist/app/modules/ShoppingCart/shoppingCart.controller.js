"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCartControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const shoppingCart_service_1 = require("./shoppingCart.service");
const createCartItems = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await shoppingCart_service_1.ShoppingCartServices.createCartItemsIntoDB(req.body.cart);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Item added to cart',
        data: result,
    });
});
const updateCartItems = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await shoppingCart_service_1.ShoppingCartServices.updateCartItemsIntoDB(req.params.id, req.body.cart);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: result.message,
        data: result.cart,
    });
});
const getAllCartItems = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await shoppingCart_service_1.ShoppingCartServices.getAllCartItemsFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
const deleteCartItems = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await shoppingCart_service_1.ShoppingCartServices.deleteAllCartItemsFromDB(req.params.id, req.body.products);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Item removed from the cart',
        data: result,
    });
});
exports.ShoppingCartControllers = {
    createCartItems,
    updateCartItems,
    getAllCartItems,
    deleteCartItems,
};
