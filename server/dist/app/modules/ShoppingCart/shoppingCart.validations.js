"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCartValidations = void 0;
const zod_1 = require("zod");
const CartItemSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    quantity: zod_1.z.number().min(1, 'Quantity must be at least 1'),
});
const CreateCartSchema = zod_1.z.object({
    body: zod_1.z.object({
        cart: zod_1.z.object({
            userId: zod_1.z.string(),
            itemsInCart: zod_1.z.array(CartItemSchema).nonempty('Cart cannot be empty'),
        }),
    }),
});
exports.ShoppingCartValidations = {
    CreateCartSchema,
};
