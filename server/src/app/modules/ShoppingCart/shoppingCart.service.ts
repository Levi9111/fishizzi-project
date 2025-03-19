import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TShoppingCart } from './shoppingCart.interface';
import { Cart } from './shoppingCart.model';
import { Products } from '../Products/products.model';
import { User } from '../User/user.model';

// Add items to cart (create or update)
const createCartItemsIntoDB = async (payload: TShoppingCart) => {
  const { userId, itemsInCart } = payload;

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // Find if the user already has a cart
  const existingCart = await Cart.findOne({ userId });

  if (existingCart) {
    // Modify the existing cart
    for (const item of itemsInCart) {
      const existingItemIndex = existingCart.itemsInCart.findIndex(
        (cartItem) =>
          cartItem.productId.toString() === item.productId.toString(),
      );

      const product = await Products.findOne({ _id: item.productId });

      if (product && item.quantity > +product.stock) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          `Insufficient stock. Only ${product.stock} items left.`,
        );
      }

      if (product?.stock === '0') {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          `This product is oute of stock`,
        );
      }

      if (existingItemIndex !== -1) {
        // If the item exists, increase the quantity
        existingCart.itemsInCart[existingItemIndex].quantity += item.quantity;
      } else {
        // If the item does not exist, add it to the array
        existingCart.itemsInCart.push(item);
      }
    }

    await existingCart.save();
    return existingCart;
  } else {
    // Create new cart if none exists
    const newCart = new Cart({
      userId,
      itemsInCart,
    });

    await newCart.save();
    return newCart;
  }
};

// Update cart items (modify quantity or remove item if quantity is 0)
const updateCartItemsIntoDB = async (
  userId: string,
  payload: {
    productId: string;
    quantity: number;
  },
) => {
  const { productId, quantity } = payload;
  const cart = await Cart.findOne({ userId });
  const product = await Products.findOne({ productId });

  if (!cart) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Cart not found');
  }

  const itemIndex = cart.itemsInCart.findIndex(
    (item) => item.productId.toString() === productId,
  );

  if (itemIndex === -1) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found in cart');
  }

  const existingQuantity = cart.itemsInCart[itemIndex].quantity;
  let message = '';

  if (quantity > existingQuantity) {
    // Increment case
    cart.itemsInCart[itemIndex].quantity = quantity;
    message = `Increased quantity of product ${product?.name} from ${existingQuantity} to ${quantity}.`;
  } else if (quantity < existingQuantity && quantity > 0) {
    // Decrement case
    cart.itemsInCart[itemIndex].quantity = quantity;
    message = `Decreased quantity of product ${product?.name} from ${existingQuantity} to ${quantity}.`;
  } else {
    // Remove item if quantity reaches 0
    cart.itemsInCart.splice(itemIndex, 1);
    message = `Removed product ${productId} from the cart.`;
  }

  await cart.save();

  // If cart is empty after update, delete it
  if (cart.itemsInCart.length === 0) {
    await Cart.findOneAndDelete({ userId });
    message = 'Cart is now empty and has been deleted.';
  }

  return { cart, message };
};

// Get all cart items for a user
const getAllCartItemsFromDB = async (userId: string) => {
  const result = await Cart.findOne({ userId })
    .populate({
      path: 'itemsInCart.productId',
      model: 'Products',
    })
    .exec();
  return result;
};

// Delete all cart items (empty the cart)
const deleteAllCartItemsFromDB = async (userId: string, productId: string) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Cart not found');
  }

  const itemIndex = cart.itemsInCart.findIndex(
    (item) => item.productId.toString() === productId,
  );

  if (itemIndex === -1) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found in cart');
  }

  cart.itemsInCart.splice(itemIndex, 1);

  await cart.save();

  const result = await Cart.findOne({ userId })
    .populate({
      path: 'itemsInCart.productId',
      model: 'Products',
    })
    .exec();
  return result;
};

// Export the shopping cart service
export const ShoppingCartServices = {
  createCartItemsIntoDB,
  updateCartItemsIntoDB,
  getAllCartItemsFromDB,
  deleteAllCartItemsFromDB,
};
