import { z } from 'zod';

const orderValidationSchema = z.object({
  body: z.object({
    order: z.object({
      userId: z.string().min(1, 'User ID is required'),
      address: z.string().min(1, 'Address ID is required'),
      location: z.enum(['Inside Dhaka', 'Outside Dhaka']),
      totalPrice: z.number(),
      products: z.array(
        z.object({
          productId: z.string().min(1, 'Product ID is required'),
          quantity: z.number().min(1, 'Quantity must be at least 1'),
        }),
      ),
      status: z
        .enum(['pending', 'confirmed', 'cancelled', 'delivered'])
        .default('pending')
        .optional(),
    }),
  }),
});

const updateOrderStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(['pending', 'confirmed', 'cancelled', 'delivered']),
  }),
});

export const OrderValidations = {
  orderValidationSchema,
  updateOrderStatusValidationSchema,
};
