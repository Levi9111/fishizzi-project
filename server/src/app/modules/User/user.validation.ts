import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    user: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email').min(1, 'Email is required'),
      image: z
        .string()
        .url('Invalid image URL')
        .min(1, 'Image URL is required'),
      provider: z.enum(['facebook', 'google']),
      phoneNumber: z.string().optional(),
      address: z.array(z.string()).optional().nullable(),
    }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    user: z.object({
      phoneNumber: z.string().optional(),
      address: z.array(z.string()).optional().nullable(),
    }),
  }),
});

const updateUserAddressValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    newAddressId: z.string(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
  updateUserAddressValidationSchema,
};
