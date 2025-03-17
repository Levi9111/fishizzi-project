import { z } from 'zod';

const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

const CreateCartSchema = z.object({
  body: z.object({
    cart: z.object({
      userId: z.string(),
      itemsInCart: z.array(CartItemSchema).nonempty('Cart cannot be empty'),
    }),
  }),
});

export const ShoppingCartValidations = {
  CreateCartSchema,
};
