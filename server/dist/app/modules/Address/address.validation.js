"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressValidations = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const createAddressSchema = zod_1.z.object({
    body: zod_1.z.object({
        address: zod_1.z.object({
            userId: zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
                message: 'Invalid user ID format',
            }),
            fullName: zod_1.z
                .string()
                .min(3, 'Full name must be at least 3 characters long'),
            phoneNumber: zod_1.z.string(),
            landmark: zod_1.z.string().optional(),
            division: zod_1.z.string().min(1, 'Division is required'),
            city: zod_1.z.string().min(1, 'City is required'),
            policeStation: zod_1.z.string().min(1, 'Police station is required'),
            address: zod_1.z.string(),
        }),
    }),
});
const updateAddressSchema = zod_1.z.object({
    body: zod_1.z.object({
        address: zod_1.z.object({
            fullName: zod_1.z
                .string()
                .min(3, 'Full name must be at least 3 characters long')
                .optional(),
            phoneNumber: zod_1.z.string().optional(),
            landmark: zod_1.z.string().optional(),
            division: zod_1.z.string().min(1, 'Division is required').optional(),
            city: zod_1.z.string().min(1, 'City is required').optional(),
            policeStation: zod_1.z.string().min(1, 'Police station is required').optional(),
            address: zod_1.z.string().optional(),
        }),
    }),
});
exports.AddressValidations = {
    createAddressSchema,
    updateAddressSchema,
};
