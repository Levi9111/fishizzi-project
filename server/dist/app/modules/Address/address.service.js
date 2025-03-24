"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.AddressServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const address_model_1 = require("./address.model");
const createAddressIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const totalAddresses = yield address_model_1.Address.find({ userId: payload.userId });
    if (totalAddresses.length >= 4) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Maximum number of addresses crossed!');
    }
    const result = (yield address_model_1.Address.create(payload)).populate('userId');
    return result;
});
const updateAddressIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield address_model_1.Address.findById(id);
    if (!address) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Address not found');
    }
    for (const [key, value] of Object.entries(payload)) {
        address[key] = value;
    }
    const result = yield address.save();
    return result;
});
const getUserAddressFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield address_model_1.Address.find({ userId });
    return result;
});
const deleteAddressFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield address_model_1.Address.findByIdAndDelete(id);
    if (!address) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Address not found');
    }
    return address;
});
const makeDefaultAddressIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield address_model_1.Address.updateMany({ default: true }, { $set: { default: false } });
    const result = yield address_model_1.Address.findByIdAndUpdate(id, {
        default: true,
    }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.AddressServices = {
    createAddressIntoDB,
    updateAddressIntoDB,
    getUserAddressFromDB,
    deleteAddressFromDB,
    makeDefaultAddressIntoDB,
};
