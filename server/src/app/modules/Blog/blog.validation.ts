import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    blog: z.object({
      title: z.string().min(5, 'Title must be at least 5 characters long'),
      content: z.array(z.string()),
    }),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    blog: z.object({
      title: z
        .string()
        .min(5, 'Title must be at least 5 characters long')
        .optional(),
      content: z.array(z.string()).optional(),
    }),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
