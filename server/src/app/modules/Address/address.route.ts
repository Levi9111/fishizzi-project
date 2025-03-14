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

router.delete('/:id', AddressController.deleteAddress);

export const AddressRoutes = router;
