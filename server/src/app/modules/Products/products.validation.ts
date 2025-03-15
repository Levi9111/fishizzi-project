import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    product: z.object({
      name: z
        .string()
        .trim()
        .min(1, 'Name is required')
        .max(100, 'Name cannot be more than 100 characters'),

      description: z.string().trim().optional(),

      price: z.string({
        required_error: 'Price is required',
      }),

      stock: z.string({
        required_error: 'Stock is required',
      }),

      category: z.string().trim().min(1, 'Category is required'),

      productImgUrl: z
        .string()
        .url('Invalid image URL')
        .optional()
        .or(z.literal('')),

      isDeleted: z.boolean().optional().default(false),
    }),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    product: z.object({
      name: z
        .string()
        .trim()
        .min(1, 'Name is required')
        .max(100, 'Name cannot be more than 100 characters')
        .optional(),

      description: z.string().trim().optional(),

      price: z.string({}).optional(),

      stock: z.string({}).optional(),
    }),
  }),
});

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
