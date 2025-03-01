import { NextFunction, Request, Response, Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidations } from './products.validation';
import { fileUploader } from '../../utils/fileUploader';
import { ProductsControllers } from './products.controller';

const router = Router();

router.post(
  '/create-product',
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductsControllers.createProduct,
);

router.patch(
  '/update-product',
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductsControllers.updateProduct,
);

router.get('/', ProductsControllers.getAllProducts);

router.get('/:id', ProductsControllers.getSingleProduct);

router.patch('/:id', ProductsControllers.deleteProduct);

export const ProuductRoutes = router;
