import { z } from 'zod';

const orderValidationSchema = z.object({
  order: z.object({
    userId: z.string().min(1, 'User ID is required'),
    address: z.string().min(1, 'Address ID is required'),
    deliveryCharge: z.number().min(0, 'Delivery charge must be positive'),
    location: z.enum(['Inside Dhaka', 'Outside Dhaka']),
    totalPrice: z.number(),
    products: z.array(z.string().min(1, 'Product ID is required')),
    status: z
      .enum(['pending', 'confirmed', 'cancelled', 'delivered'])
      .default('pending'),
  }),
});

const updateOrderStatusValidationSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'delivered']),
});

export const OrderValidations = {
  orderValidationSchema,
  updateOrderStatusValidationSchema,
};
