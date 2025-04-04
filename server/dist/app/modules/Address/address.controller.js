"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const address_service_1 = require("./address.service");
const createAddress = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await address_service_1.AddressServices.createAddressIntoDB(req.body.address);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Address added succesfully',
        data: result,
    });
});
const updateAddress = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await address_service_1.AddressServices.updateAddressIntoDB(req.params.id, req.body.address);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Address updated succesfully',
        data: result,
    });
});
const getUserAddress = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await address_service_1.AddressServices.getUserAddressFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
const deleteAddress = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await address_service_1.AddressServices.deleteAddressFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Address deleted successfully',
        data: result,
    });
});
const defaultAddress = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await address_service_1.AddressServices.makeDefaultAddressIntoDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Address changed to default',
        data: result,
    });
});
exports.AddressController = {
    createAddress,
    updateAddress,
    getUserAddress,
    deleteAddress,
    defaultAddress,
};
