import { Types } from 'mongoose';

export interface TOrder {
  userId: Types.ObjectId;
  address: Types.ObjectId;
  location: 'Inside Dhaka' | 'Outside Dhaka';
  products: {
    productId: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  trackingNumber: number;
  userEmail: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'delivered';
}
