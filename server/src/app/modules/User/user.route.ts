import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { createCustomerValidationSchema } from '../Customer/customer.validations';
import { UserControllers } from './user.controller';
import { createAdminValidationSchema } from '../Admin/admin.validations';
import { UserValidation } from './user.validation';

const router = Router();

router.post(
  '/create-customer',
  validateRequest(createCustomerValidationSchema),
  UserControllers.createCustomer,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.post(
  '/change-status/:id',
  validateRequest(UserValidation.changeStatusValidationSchema),
);

router.get('/me', UserControllers.getMe);

export const UserRoutes = router;
