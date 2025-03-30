import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { OrderValidations } from './orders.validation';
import { OrderController } from './orders.controller';

const router = Router();

router.post(
  '/create-order',
  validateRequest(OrderValidations.orderValidationSchema),
  OrderController.createOrder,
);

router.get('/', OrderController.getAllOrders);

router.get('/my-orders/:userId', OrderController.getMyOrders);

router.get('/order/:orderId', OrderController.getSingleOrder);

router.patch(
  '/update-order-status/:orderId',
  validateRequest(OrderValidations.updateOrderStatusValidationSchema),
  OrderController.updateOrderStatus,
);

export const OrderRoutes = router;
