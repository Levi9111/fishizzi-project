import { Model, Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TCustomer = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  dateOfBirth?: Date;
  gender: string;
  email: string;
  contactNo: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface CustomerModel extends Model<TCustomer> {
  isUserExists(id: string): Promise<TCustomer | null>;
}
