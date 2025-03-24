"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidations = void 0;
const zod_1 = require("zod");
const createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        product: zod_1.z.object({
            name: zod_1.z
                .string()
                .trim()
                .min(1, 'Name is required')
                .max(100, 'Name cannot be more than 100 characters'),
            description: zod_1.z.string().trim().optional(),
            price: zod_1.z.string({
                required_error: 'Price is required',
            }),
            stock: zod_1.z.string({
                required_error: 'Stock is required',
            }),
            category: zod_1.z.string().trim().min(1, 'Category is required'),
            productImgUrl: zod_1.z
                .string()
                .url('Invalid image URL')
                .optional()
                .or(zod_1.z.literal('')),
            isDeleted: zod_1.z.boolean().optional().default(false),
        }),
    }),
});
const updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        product: zod_1.z.object({
            name: zod_1.z
                .string()
                .trim()
                .min(1, 'Name is required')
                .max(100, 'Name cannot be more than 100 characters')
                .optional(),
            description: zod_1.z.string().trim().optional(),
            price: zod_1.z.string({}).optional(),
            stock: zod_1.z.string({}).optional(),
        }),
    }),
});
exports.ProductValidations = {
    createProductValidationSchema,
    updateProductValidationSchema,
};
