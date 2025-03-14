import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AddressServices } from './address.service';

const createAddress = catchAsync(async (req, res) => {
  const result = await AddressServices.createAddressIntoDB(req.body.address);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Address added succesfully',
    data: result,
  });
});

const updateAddress = catchAsync(async (req, res) => {
  const result = await AddressServices.updateAddressIntoDB(
    req.params.id,
    req.body.address,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Address updated succesfully',
    data: result,
  });
});

const deleteAddress = catchAsync(async (req, res) => {
  const result = await AddressServices.deleteAddressFromDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Address deleted successfully',
    data: result,
  });
});

export const AddressController = {
  createAddress,
  updateAddress,
  deleteAddress,
};
