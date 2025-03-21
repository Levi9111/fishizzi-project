import { Router } from 'express';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';

const router = Router();

router.post(
  '/create-user',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.patch(
  '/update-user/:id',
  validateRequest(UserValidations.updateUserValidationSchema),
  UserControllers.updateUser,
);

router.patch(
  '/update-address',
  validateRequest(UserValidations.updateUserAddressValidationSchema),
  UserControllers.updateUserAddress,
);

router.get('/', UserControllers.getAllUsers);

router.get('/:id', UserControllers.getSingleUser);

router.put('/:id', UserControllers.blockUser);

export const UserRoutes = router;
