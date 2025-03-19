import { model, Schema } from 'mongoose';
import { TAddress } from './address.interface';

const addressSchema = new Schema<TAddress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullName: { type: String, required: true, minlength: 3 },
    phoneNumber: {
      type: String,
      required: true,
    },
    landmark: { type: String },
    division: { type: String, required: true },
    city: { type: String, required: true },
    policeStation: { type: String, required: true },
    address: { type: String, required: true, minlength: 5 },
    default: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Address = model<TAddress>('Address', addressSchema);
