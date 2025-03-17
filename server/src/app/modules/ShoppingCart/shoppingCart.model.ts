import { model, Schema } from 'mongoose';
import { TShoppingCart } from './shoppingCart.interface';

const CartSchema = new Schema<TShoppingCart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    itemsInCart: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true },
);

export const Cart = model<TShoppingCart>('Cart', CartSchema);
