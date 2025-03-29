/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TOrder } from './orders.interface';
import { Orders } from './orders.model';
import QueryBuilder from '../../builder/Querybuilder';

const createOrderIntoDB = async (payload: TOrder) => {
  const result = await Orders.create(payload);

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
    Orders.find().populate('userId address products'),
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
  const result = await Orders.findById(orderId).populate(
    'userId address products',
  );
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
