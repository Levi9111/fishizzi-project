"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const user_model_1 = require("./user.model");
const createUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const existingUser = await user_model_1.User.findOne({ email: req.body.user.email });
    if (existingUser) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: 'User logged in succesfully',
            data: existingUser,
        });
    }
    const result = await user_service_1.UserServices.createUserIntoDB(req.body.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'User Profile created succesfully',
        data: result,
    });
});
const getAllUsers = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_service_1.UserServices.getAllUsersFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'All users are fetched succesfully',
        data: result,
    });
});
const getSingleUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_service_1.UserServices.getUserByIdFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'User fetched succesfully',
        data: result,
    });
});
const updateUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_service_1.UserServices.updateUserIntoDB(req.params.id, req.body.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'User information updated succesfully',
        data: result,
    });
});
const blockUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_service_1.UserServices.blockUserFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'User is blocked succesfully',
        data: result,
    });
});
const updateUserAddress = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { userId, newAddressId } = req.body;
    const result = await user_service_1.UserServices.updateUserAddressIntoDB(userId, newAddressId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Address added successfully',
        data: result,
    });
});
exports.UserControllers = {
    createUser,
    updateUser,
    getAllUsers,
    getSingleUser,
    blockUser,
    updateUserAddress,
};
