import { model, Schema } from 'mongoose';
import { TOrder } from './orders.interface';

const OrderSchema = new Schema<TOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
    location: {
      type: String,
      enum: ['Inside Dhaka', 'Outside Dhaka'],
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'delivered'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const Orders = model<TOrder>('Order', OrderSchema);
