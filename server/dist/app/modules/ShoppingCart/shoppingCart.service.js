"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCartServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const shoppingCart_model_1 = require("./shoppingCart.model");
const products_model_1 = require("../Products/products.model");
const user_model_1 = require("../User/user.model");
// Add items to cart (create or update)
const createCartItemsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, itemsInCart } = payload;
    const user = yield user_model_1.User.findOne({ _id: userId });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    // Find if the user already has a cart
    const existingCart = yield shoppingCart_model_1.Cart.findOne({ userId });
    if (existingCart) {
        // Modify the existing cart
        for (const item of itemsInCart) {
            const existingItemIndex = existingCart.itemsInCart.findIndex((cartItem) => cartItem.productId.toString() === item.productId.toString());
            const product = yield products_model_1.Products.findOne({ _id: item.productId });
            if (product && item.quantity > +product.stock) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Insufficient stock. Only ${product.stock} items left.`);
            }
            if ((product === null || product === void 0 ? void 0 : product.stock) === '0') {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `This product is oute of stock`);
            }
            if (existingItemIndex !== -1) {
                // If the item exists, increase the quantity
                existingCart.itemsInCart[existingItemIndex].quantity += item.quantity;
            }
            else {
                // If the item does not exist, add it to the array
                existingCart.itemsInCart.push(item);
            }
        }
        yield existingCart.save();
        return existingCart;
    }
    else {
        // Create new cart if none exists
        const newCart = new shoppingCart_model_1.Cart({
            userId,
            itemsInCart,
        });
        yield newCart.save();
        return newCart;
    }
});
// Update cart items (modify quantity or remove item if quantity is 0)
const updateCartItemsIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = payload;
    const cart = yield shoppingCart_model_1.Cart.findOne({ userId });
    const product = yield products_model_1.Products.findOne({ productId });
    if (!cart) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Cart not found');
    }
    const itemIndex = cart.itemsInCart.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex === -1) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Product not found in cart');
    }
    const existingQuantity = cart.itemsInCart[itemIndex].quantity;
    let message = '';
    if (quantity > existingQuantity) {
        // Increment case
        cart.itemsInCart[itemIndex].quantity = quantity;
        message = `Increased quantity of product ${product === null || product === void 0 ? void 0 : product.name} from ${existingQuantity} to ${quantity}.`;
    }
    else if (quantity < existingQuantity && quantity > 0) {
        // Decrement case
        cart.itemsInCart[itemIndex].quantity = quantity;
        message = `Decreased quantity of product ${product === null || product === void 0 ? void 0 : product.name} from ${existingQuantity} to ${quantity}.`;
    }
    else {
        // Remove item if quantity reaches 0
        cart.itemsInCart.splice(itemIndex, 1);
        message = `Removed product ${productId} from the cart.`;
    }
    yield cart.save();
    // If cart is empty after update, delete it
    if (cart.itemsInCart.length === 0) {
        yield shoppingCart_model_1.Cart.findOneAndDelete({ userId });
        message = 'Cart is now empty and has been deleted.';
    }
    return { cart, message };
});
// Get all cart items for a user
const getAllCartItemsFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shoppingCart_model_1.Cart.findOne({ userId })
        .populate({
        path: 'itemsInCart.productId',
        model: 'Products',
    })
        .exec();
    return result;
});
// Delete all cart items (empty the cart)
const deleteAllCartItemsFromDB = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield shoppingCart_model_1.Cart.findOne({ userId });
    if (!cart) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Cart not found');
    }
    const itemIndex = cart.itemsInCart.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex === -1) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Product not found in cart');
    }
    cart.itemsInCart.splice(itemIndex, 1);
    yield cart.save();
    const result = yield shoppingCart_model_1.Cart.findOne({ userId })
        .populate({
        path: 'itemsInCart.productId',
        model: 'Products',
    })
        .exec();
    return result;
});
// Export the shopping cart service
exports.ShoppingCartServices = {
    createCartItemsIntoDB,
    updateCartItemsIntoDB,
    getAllCartItemsFromDB,
    deleteAllCartItemsFromDB,
};
