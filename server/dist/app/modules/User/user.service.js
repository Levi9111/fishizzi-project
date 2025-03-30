"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const Querybuilder_1 = __importDefault(require("../../builder/Querybuilder"));
const user_constant_1 = require("./user.constant");
const createUserIntoDB = async (payload) => {
    const result = await user_model_1.User.create(payload);
    return result;
};
const updateUserIntoDB = async (id, payload) => {
    const user = await user_model_1.User.findById(id);
    if (!user || user.status === 'blocked') {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    for (const [key, value] of Object.entries(payload)) {
        user[key] = value;
    }
    const result = await user.save();
    return result;
};
const getAllUsersFromDB = async (query) => {
    //   only admin
    const userQuery = new Querybuilder_1.default(user_model_1.User.find(), query)
        .search(user_constant_1.userSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    const result = await userQuery?.modelQuery;
    return result;
};
const getUserByIdFromDB = async (id) => {
    const user = await user_model_1.User.findById(id);
    if (!user || user.status === 'blocked') {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    return user;
};
const blockUserFromDB = async (id) => {
    const user = await user_model_1.User.findById(id);
    if (!user || user.status === 'blocked') {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    const result = await user_model_1.User.findByIdAndUpdate(id, { status: 'blocked' }, { new: true, runValidators: true });
    return result;
};
const updateUserAddressIntoDB = async (userId, newAddressId) => {
    const updatedUser = await user_model_1.User.findByIdAndUpdate(userId, { $push: { address: newAddressId } }, { new: true });
    if (!updatedUser) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    return updatedUser;
};
exports.UserServices = {
    createUserIntoDB,
    updateUserIntoDB,
    getAllUsersFromDB,
    getUserByIdFromDB,
    blockUserFromDB,
    updateUserAddressIntoDB,
};
