import { model, Schema } from 'mongoose';
import { TUserData } from './user.interface';

const userSchema = new Schema<TUserData>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    provider: { type: String, enum: ['facebook', 'google'], required: true },
    status: { type: String, enum: ['active', 'blocked'], default: 'active' },
    phoneNumber: { type: String, required: false },
    address: { type: [String], default: [] },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 }, { unique: true });

export const User = model<TUserData>('User', userSchema);
