import { Schema } from 'mongoose';

export type TAddress = {
  userId: Schema.Types.ObjectId;
  fullName: string;
  phoneNumber: string;
  landmark?: string;
  division: string;
  city: string;
  policeStation: string;
  address: string;
  default: boolean;
};
