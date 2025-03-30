/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TOrder } from './orders.interface';
import { Orders } from './orders.model';
import QueryBuilder from '../../builder/Querybuilder';
import { User } from '../User/user.model';
import { Address } from '../Address/address.model';
import { Products } from '../Products/products.model';
import { generateTrackingNumber } from '../../utils/orderTrackingNumber';

const createOrderIntoDB = async (payload: TOrder) => {
  const { userId, products, address } = payload;

  const userData = await User.find({ _id: userId });
  if (!userData) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  const addressData = await Address.find({ _id: address });
  if (!addressData) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Address not found');
  }
  const productsData = await Products.find({
    _id: { $in: products.map((p) => p.productId) },
  });
  if (!productsData || productsData.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Products not found');
  }

  const trackingNumber = await generateTrackingNumber();

  payload.trackingNumber = +trackingNumber;

  const createdOrder = await Orders.create(payload);
  const result = await createdOrder.populate(
    'userId address products.productId',
  );

  return result;
};

const getMyOrdersFromDB = async (userId: string) => {
  const result = await Orders.find({ userId }).populate(
    'userId address products',
  );

  if (!result || result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No orders found for this user');
  }

  return result;
};

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const ordersQuery = new QueryBuilder(
    Orders.find()
      .populate({
        path: 'userId',
        select: '_id name image status',
      })
      .populate({
        path: 'address',
        select: 'fullName phoneNumber',
      })
      .populate({
        path: 'products.productId',
        select: '_id name price productImgUrl',
      })
      .select('location products totalPrice status trackingNumber')
      .lean(),
    query,
  )
    .search(['email'])
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await ordersQuery?.modelQuery;
  return result;
};

const getSingleOrderFromDB = async (orderId: string) => {
  const result = await Orders.findById(orderId)
    .populate({
      path: 'userId',
      select: '_id name image status',
    })
    .populate({
      path: 'address',
    })
    .populate({
      path: 'products.productId',
      select: '_id name price productImgUrl quantity',
    })
    .select('location totalPrice status trackingNumber')
    .lean();
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }
  return result;
};

const updateOrderStatusIntoDB = async (
  orderId: string,
  newStatus: TOrder['status'],
) => {
  const order = await Orders.findById(orderId);

  if (!order) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Order not found');
  }

  if (order.status === 'cancelled') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Order is already cancelled');
  }
  if (order.status === 'delivered') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Order is already delivered');
  }

  const allowedStatuses: TOrder['status'][] = [
    'pending',
    'confirmed',
    'cancelled',
    'delivered',
  ];

  if (!allowedStatuses.includes(newStatus)) {
    throw new Error('Invalid status');
  }

  order.status = newStatus;

  const result = await order.save();

  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getMyOrdersFromDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  updateOrderStatusIntoDB,
};
