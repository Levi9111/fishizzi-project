"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    provider: { type: String, enum: ['facebook', 'google'], required: true },
    status: { type: String, enum: ['active', 'blocked'], default: 'active' },
    phoneNumber: { type: String, required: false },
    address: { type: [String], default: [] },
}, { timestamps: true });
userSchema.index({ email: 1 }, { unique: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
