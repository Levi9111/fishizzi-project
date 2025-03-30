"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const address_model_1 = require("./address.model");
const createAddressIntoDB = async (payload) => {
    const totalAddresses = await address_model_1.Address.find({ userId: payload.userId });
    if (totalAddresses.length >= 4) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Maximum number of addresses crossed!');
    }
    const result = (await address_model_1.Address.create(payload)).populate('userId');
    return result;
};
const updateAddressIntoDB = async (id, payload) => {
    const address = await address_model_1.Address.findById(id);
    if (!address) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Address not found');
    }
    for (const [key, value] of Object.entries(payload)) {
        address[key] = value;
    }
    const result = await address.save();
    return result;
};
const getUserAddressFromDB = async (userId) => {
    const result = await address_model_1.Address.find({ userId });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Address not found');
    }
    return result;
};
const deleteAddressFromDB = async (id) => {
    const address = await address_model_1.Address.findByIdAndDelete(id);
    if (!address) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Address not found');
    }
    return address;
};
const makeDefaultAddressIntoDB = async (id) => {
    await address_model_1.Address.updateMany({ default: true }, { $set: { default: false } });
    const result = await address_model_1.Address.findByIdAndUpdate(id, {
        default: true,
    }, {
        new: true,
        runValidators: true,
    });
    return result;
};
exports.AddressServices = {
    createAddressIntoDB,
    updateAddressIntoDB,
    getUserAddressFromDB,
    deleteAddressFromDB,
    makeDefaultAddressIntoDB,
};
