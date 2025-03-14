import { z } from 'zod';
import { Types } from 'mongoose';

const createAddressSchema = z.object({
  body: z.object({
    address: z.object({
      userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid user ID format',
      }),
      fullName: z
        .string()
        .min(3, 'Full name must be at least 3 characters long'),
      phoneNumber: z.string(),
      landmark: z.string().optional(),
      division: z.string().min(1, 'Division is required'),
      city: z.string().min(1, 'City is required'),
      policeStation: z.string().min(1, 'Police station is required'),
      address: z.string(),
    }),
  }),
});

const updateAddressSchema = z.object({
  body: z.object({
    address: z.object({
      fullName: z
        .string()
        .min(3, 'Full name must be at least 3 characters long')
        .optional(),
      phoneNumber: z.string().optional(),
      landmark: z.string().optional(),
      division: z.string().min(1, 'Division is required').optional(),
      city: z.string().min(1, 'City is required').optional(),
      policeStation: z.string().min(1, 'Police station is required').optional(),
      address: z.string().optional(),
    }),
  }),
});

export const AddressValidations = {
  createAddressSchema,
  updateAddressSchema,
};
