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

      price: z
        .number({
          invalid_type_error: 'Price must be a number',
          required_error: 'Price is required',
        })
        .positive('Price must be a positive number'),

      stock: z
        .number({
          invalid_type_error: 'Stock must be a number',
          required_error: 'Stock is required',
        })
        .int('Stock must be an integer')
        .min(0, 'Stock cannot be negative'),

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

      price: z
        .number({
          invalid_type_error: 'Price must be a number',
        })
        .positive('Price must be a positive number')
        .optional(),

      stock: z
        .number({
          invalid_type_error: 'Stock must be a number',
        })
        .int('Stock must be an integer')
        .min(0, 'Stock cannot be negative')
        .optional(),

      // productImgUrl: z
      //   .string()
      //   .url('Invalid image URL')
      //   .optional()
      //   .or(z.literal('')),
    }),
  }),
});

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
