import mongoose, { Error } from 'mongoose';
import { TAdmin } from '../Admin/admin.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { Admin } from '../Admin/admin.model';
import { TCustomer } from '../Customer/customer.interface';
import { Customer } from '../Customer/customer.model';

const createCustomerIntoDB = async (password: string, payload: TCustomer) => {
  const userData: Partial<TUser> = {};

  userData.password = password;

  userData.role = 'customer';
  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newUser = await User.create([userData], {
      session,
    });

    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create new user!');
    }

    payload.user = newUser[0]._id;

    const newCustomer = await Customer.create([payload], { session });

    if (!newCustomer.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create Custoemr');
    }

    await session.commitTransaction();
    await session.endSession();

    return newCustomer;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};

  userData.password = password;

  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newUser = await User.create([userData], {
      session,
    });

    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create new user!');
    }

    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const changeStatus = async (
  id: string,
  payload: {
    status: string;
  },
) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const getMe = async (userId: string, role: string) => {
  let result;

  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }

  if (role === 'customer') {
    result = await Customer.findOne({ id: userId }).populate('user');
  }

  return result;
};

export const UserServices = {
  createCustomerIntoDB,
  createAdminIntoDB,
  changeStatus,
  getMe,
};
