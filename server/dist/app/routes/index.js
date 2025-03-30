"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_route_1 = require("../modules/Products/products.route");
const user_route_1 = require("../modules/User/user.route");
const address_route_1 = require("../modules/Address/address.route");
const shoppingCart_route_1 = require("../modules/ShoppingCart/shoppingCart.route");
const blog_route_1 = require("../modules/Blog/blog.route");
const orders_route_1 = require("../modules/Orders/orders.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/products',
        route: products_route_1.ProuductRoutes,
    },
    {
        path: '/address',
        route: address_route_1.AddressRoutes,
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRoutes,
    },
    {
        path: '/my-cart',
        route: shoppingCart_route_1.ShoppingCartRoutes,
    },
    {
        path: '/orders',
        route: orders_route_1.OrderRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
