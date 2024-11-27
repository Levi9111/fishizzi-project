import { z } from 'zod';
import { Gender } from './admin.constant';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
});

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    admin: z.object({
      designation: z.string(),
      name: createUserNameValidationSchema,
      dateOfBirth: z.string().optional(),
      gender: z.enum([...Gender] as [string, ...string[]]),
      email: z.string().email(),
      contactNo: z.string(),
      profileImg: z.string(),
    }),
  }),
});
