/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TAddress } from './address.interface';
import { Address } from './address.model';

const createAddressIntoDB = async (payload: TAddress) => {
  const result = (await Address.create(payload)).populate('userId');

  return result;
};

const updateAddressIntoDB = async (id: string, payload: Partial<TAddress>) => {
  const address = await Address.findById(id);

  if (!address) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Address not found');
  }

  for (const [key, value] of Object.entries(payload)) {
    (address as any)[key] = value;
  }

  const result = await address.save();

  return result;
};

const deleteAddressFromDB = async (id: string) => {
  const address = await Address.findByIdAndDelete(id);

  if (!address) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Address not found');
  }

  return address;
};

export const AddressServices = {
  createAddressIntoDB,
  updateAddressIntoDB,
  deleteAddressFromDB,
};
