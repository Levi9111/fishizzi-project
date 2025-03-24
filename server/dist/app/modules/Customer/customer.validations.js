"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerValidationSchema = void 0;
const zod_1 = require("zod");
const createUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20),
    lastName: zod_1.z.string().min(1).max(20),
});
exports.createCustomerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string(),
        admin: zod_1.z.object({
            designation: zod_1.z.string(),
            name: createUserNameValidationSchema,
            dateOfBirth: zod_1.z.string().optional(),
            gender: zod_1.z.enum(['male', 'female', 'others']),
            email: zod_1.z.string().email(),
            contactNo: zod_1.z.string(),
            profileImg: zod_1.z.string(),
        }),
    }),
});
