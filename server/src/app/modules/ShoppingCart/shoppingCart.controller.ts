import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ShoppingCartServices } from './shoppingCart.service';

const createCartItems = catchAsync(async (req, res) => {
  const result = await ShoppingCartServices.createCartItemsIntoDB(
    req.body.cart,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Item added to cart',
    data: result,
  });
});

const updateCartItems = catchAsync(async (req, res) => {
  const result = await ShoppingCartServices.updateCartItemsIntoDB(
    req.params.id,
    req.body.cart,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: result.message,
    data: result.cart,
  });
});

const getAllCartItems = catchAsync(async (req, res) => {
  const result = await ShoppingCartServices.getAllCartItemsFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

const deleteCartItems = catchAsync(async (req, res) => {
  const result = await ShoppingCartServices.deleteAllCartItemsFromDB(
    req.params.id,
    req.body.products,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Item removed from the cart',
    data: result,
  });
});

export const ShoppingCartControllers = {
  createCartItems,
  updateCartItems,
  getAllCartItems,
  deleteCartItems,
};
