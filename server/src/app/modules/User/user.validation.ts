import { z } from 'zod';
import { UserStatus } from '../../constants';

const userValidationSchema = z.object({
  password: z.string({
    invalid_type_error: 'Password must be string',
  }),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
};
