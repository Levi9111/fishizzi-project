import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ShoppingCartValidations } from './shoppingCart.validations';
import { ShoppingCartControllers } from './shoppingCart.controller';

const router = Router();

router.get('/:id', ShoppingCartControllers.getAllCartItems);

router.post(
  '/add-to-cart',
  validateRequest(ShoppingCartValidations.CreateCartSchema),
  ShoppingCartControllers.createCartItems,
);

router.patch('/update-my-cart/:id', ShoppingCartControllers.updateCartItems);

router.delete(
  '/remove-items-from-cart/:id',
  ShoppingCartControllers.deleteCartItems,
);

export const ShoppingCartRoutes = router;
