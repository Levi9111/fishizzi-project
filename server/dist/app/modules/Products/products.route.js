"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProuductRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const products_validation_1 = require("./products.validation");
const fileUploader_1 = require("../../utils/fileUploader");
const products_controller_1 = require("./products.controller");
const router = (0, express_1.Router)();
router.post('/create-product', fileUploader_1.fileUploader.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(products_validation_1.ProductValidations.createProductValidationSchema), products_controller_1.ProductsControllers.createProduct);
router.patch('/update-product/:id', (0, validateRequest_1.default)(products_validation_1.ProductValidations.updateProductValidationSchema), products_controller_1.ProductsControllers.updateProduct);
router.get('/', products_controller_1.ProductsControllers.getAllProducts);
router.get('/:id', products_controller_1.ProductsControllers.getSingleProduct);
router.delete('/:id', products_controller_1.ProductsControllers.deleteProduct);
exports.ProuductRoutes = router;
