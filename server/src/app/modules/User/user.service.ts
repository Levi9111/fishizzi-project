/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TUserData } from './user.interface';
import { User } from './user.model';
import QueryBuilder from '../../builder/Querybuilder';
import { userSearchableFields } from './user.constant';

const createUserIntoDB = async (payload: TUserData) => {
  const result = await User.create(payload);

  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUserData>) => {
  const user = await User.findById(id);

  if (!user || user.status === 'blocked') {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  for (const [key, value] of Object.entries(payload)) {
    (user as any)[key] = value;
  }

  const result = await user.save();

  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  //   only admin

  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await userQuery?.modelQuery;
  return result;
};

const getUserByIdFromDB = async (id: string) => {
  const user = await User.findById(id);

  if (!user || user.status === 'blocked') {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return user;
};

const blockUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  if (!user || user.status === 'blocked') {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const result = await User.findByIdAndUpdate(
    id,
    { status: 'blocked' },
    { new: true, runValidators: true },
  );

  return result;
};

export const UserServices = {
  createUserIntoDB,
  updateUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  blockUserFromDB,
};
