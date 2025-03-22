import { NextFunction, Request, Response, Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { fileUploader } from '../../utils/fileUploader';
import { BlogValidations } from './blog.validation';
import { BlogControllers } from './blog.controller';

const router = Router();

router.post(
  '/create-blog',
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.patch(
  '/update-blog/:id',
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.get('/', BlogControllers.getAllBlogs);

router.get('/:id', BlogControllers.getSingleBlog);

router.delete('/:id', BlogControllers.deleteBlog);

export const BlogRoutes = router;
