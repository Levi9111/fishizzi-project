import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createCustomer = catchAsync(async (req, res) => {
  const { password, customer: customerData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, customerData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is created successfully created',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin is created successfully created',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Status Updated successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;

  const result = await UserServices.getMe(userId, role);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${role} retired successfully`,
    data: result,
  });
});

export const UserControllers = {
  createCustomer,
  createAdmin,
  changeStatus,
  getMe,
};
