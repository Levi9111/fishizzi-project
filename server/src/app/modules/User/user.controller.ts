import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import { User } from './user.model';

const createUser = catchAsync(async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.user.email });

  if (existingUser) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'User logged in succesfully',
      data: existingUser,
    });
  }
  const result = await UserServices.createUserIntoDB(req.body.user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Profile created succesfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All users are fetched succesfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const result = await UserServices.getUserByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User fetched succesfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserIntoDB(
    req.params.id,
    req.body.user,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User information updated succesfully',
    data: result,
  });
});

const blockUser = catchAsync(async (req, res) => {
  const result = await UserServices.blockUserFromDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is blocked succesfully',
    data: result,
  });
});

const updateUserAddress = catchAsync(async (req, res) => {
  const { userId, newAddressId } = req.body;
  const result = await UserServices.updateUserAddressIntoDB(
    userId,
    newAddressId,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Address added successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  updateUser,
  getAllUsers,
  getSingleUser,
  blockUser,
  updateUserAddress,
};
