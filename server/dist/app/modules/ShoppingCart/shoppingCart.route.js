"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCartRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const shoppingCart_validations_1 = require("./shoppingCart.validations");
const shoppingCart_controller_1 = require("./shoppingCart.controller");
const router = (0, express_1.Router)();
router.get('/:id', shoppingCart_controller_1.ShoppingCartControllers.getAllCartItems);
router.post('/add-to-cart', (0, validateRequest_1.default)(shoppingCart_validations_1.ShoppingCartValidations.CreateCartSchema), shoppingCart_controller_1.ShoppingCartControllers.createCartItems);
router.patch('/update-my-cart/:id', shoppingCart_controller_1.ShoppingCartControllers.updateCartItems);
router.patch('/remove-items-from-cart/:id', shoppingCart_controller_1.ShoppingCartControllers.deleteCartItems);
exports.ShoppingCartRoutes = router;
