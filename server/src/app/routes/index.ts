import { Router } from 'express';
import { ProuductRoutes } from '../modules/Products/products.route';
import { UserRoutes } from '../modules/User/user.route';
import { AddressRoutes } from '../modules/Address/address.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/products',
    route: ProuductRoutes,
  },
  {
    path: '/address',
    route: AddressRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
