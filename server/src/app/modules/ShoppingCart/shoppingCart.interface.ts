import { Types } from 'mongoose';

export interface TCartItem {
  productId: Types.ObjectId;
  quantity: number;
}

export interface TShoppingCart {
  userId: Types.ObjectId;
  itemsInCart: TCartItem[];
}
