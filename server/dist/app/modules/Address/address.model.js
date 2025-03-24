"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fullName: { type: String, required: true, minlength: 3 },
    phoneNumber: {
        type: String,
        required: true,
    },
    landmark: { type: String },
    division: { type: String, required: true },
    city: { type: String, required: true },
    policeStation: { type: String, required: true },
    address: { type: String, required: true, minlength: 5 },
    default: { type: Boolean, default: false },
}, { timestamps: true });
exports.Address = (0, mongoose_1.model)('Address', addressSchema);
