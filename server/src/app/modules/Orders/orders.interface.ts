import { Types } from 'mongoose';

export interface TOrder {
  userId: Types.ObjectId;
  address: Types.ObjectId;
  location: 'Inside Dhaka' | 'Outside Dhaka';
  products: Types.ObjectId[];
  totalPrice: number;
  deliveryCharge: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'delivered';
}
