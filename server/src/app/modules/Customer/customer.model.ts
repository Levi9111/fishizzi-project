import { Schema, model } from 'mongoose';
import { CustomerModel, TCustomer, TUserName } from './customer.interface';
import { Gender } from '../Admin/admin.constant';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const customerSchema = new Schema<TCustomer, CustomerModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    profileImg: { type: String, default: '' },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// generating full name
customerSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + '' + this?.name?.lastName;
});

// filter out deleted documents
customerSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

customerSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//checking if user is already exist!
customerSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Customer.findOne({ id });
  return existingUser;
};

export const Customer = model<TCustomer, CustomerModel>(
  'Customer',
  customerSchema,
);
