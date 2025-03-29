import { Router } from 'express';
import { ProuductRoutes } from '../modules/Products/products.route';
import { UserRoutes } from '../modules/User/user.route';
import { AddressRoutes } from '../modules/Address/address.route';
import { ShoppingCartRoutes } from '../modules/ShoppingCart/shoppingCart.route';
import { BlogRoutes } from '../modules/Blog/blog.route';
import { OrderRoutes } from '../modules/Orders/orders.route';

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
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/my-cart',
    route: ShoppingCartRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
