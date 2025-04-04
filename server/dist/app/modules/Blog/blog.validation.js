"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidations = void 0;
const zod_1 = require("zod");
const createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        blog: zod_1.z.object({
            title: zod_1.z.string().min(5, 'Title must be at least 5 characters long'),
            content: zod_1.z.array(zod_1.z.string()),
        }),
    }),
});
const updateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        blog: zod_1.z.object({
            title: zod_1.z
                .string()
                .min(5, 'Title must be at least 5 characters long')
                .optional(),
            content: zod_1.z.array(zod_1.z.string()).optional(),
        }),
    }),
});
exports.BlogValidations = {
    createBlogValidationSchema,
    updateBlogValidationSchema,
};
