"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const address_validation_1 = require("./address.validation");
const address_controller_1 = require("./address.controller");
const router = (0, express_1.Router)();
router.post('/create-address', (0, validateRequest_1.default)(address_validation_1.AddressValidations.createAddressSchema), address_controller_1.AddressController.createAddress);
router.patch('/update-address/:id', (0, validateRequest_1.default)(address_validation_1.AddressValidations.updateAddressSchema), address_controller_1.AddressController.updateAddress);
router.patch('/default-address/:id', address_controller_1.AddressController.defaultAddress);
router.delete('/:id', address_controller_1.AddressController.deleteAddress);
router.get('/:id', address_controller_1.AddressController.getUserAddress);
exports.AddressRoutes = router;
