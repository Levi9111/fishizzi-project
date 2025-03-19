import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AddressValidations } from './address.validation';
import { AddressController } from './address.controller';

const router = Router();

router.post(
  '/create-address',
  validateRequest(AddressValidations.createAddressSchema),
  AddressController.createAddress,
);

router.patch(
  '/update-address/:id',
  validateRequest(AddressValidations.updateAddressSchema),
  AddressController.updateAddress,
);

router.patch('/default-address/:id', AddressController.defaultAddress);

router.delete('/:id', AddressController.deleteAddress);

router.get('/:id', AddressController.getUserAddress);

export const AddressRoutes = router;
