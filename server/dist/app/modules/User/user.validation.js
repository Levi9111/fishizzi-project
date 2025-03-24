"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.object({
            name: zod_1.z.string().min(1, 'Name is required'),
            email: zod_1.z.string().email('Invalid email').min(1, 'Email is required'),
            image: zod_1.z
                .string()
                .url('Invalid image URL')
                .min(1, 'Image URL is required'),
            provider: zod_1.z.enum(['facebook', 'google']),
            phoneNumber: zod_1.z.string().optional(),
            address: zod_1.z.array(zod_1.z.string()).optional().nullable(),
        }),
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.object({
            phoneNumber: zod_1.z.string().optional(),
            address: zod_1.z.array(zod_1.z.string()).optional().nullable(),
        }),
    }),
});
const updateUserAddressValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string(),
        newAddressId: zod_1.z.string(),
    }),
});
exports.UserValidations = {
    createUserValidationSchema,
    updateUserValidationSchema,
    updateUserAddressValidationSchema,
};
