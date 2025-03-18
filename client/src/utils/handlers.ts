import {
  deleteDataFromDB,
  getDataFromDB,
  postToDB,
  updateDataIntoDB,
} from '@/api';
import { TCartItem, TCartItemInCart } from '@/Interface';
import { toast } from 'sonner';

export const handleAddToCart = async (
  userId: string,
  productId: string,
  base_url: string,
  stock: number,
  setLoading?: (loading: boolean) => void,
) => {
  // 1. check the quantity of the product in the cart
  const result = await getDataFromDB(`${base_url}/my-cart/${userId}`);
  const existingProduct = result.data.itemsInCart.find(
    (item: TCartItemInCart) => item.productId._id === productId,
  );

  if (existingProduct && existingProduct.quantity === 8) {
    toast.warning('You can order a maximum of 8 units per product.');
    return;
  } else if (existingProduct && existingProduct.quantity === stock) {
    toast.warning('Sorry, we do not have enough stock for your order.');
    return;
  } else {
    try {
      if (setLoading) setLoading(true);
      const result = await postToDB(`${base_url}/my-cart/add-to-cart`, {
        cart: {
          userId,
          itemsInCart: [
            {
              productId,
              quantity: 1,
            },
          ],
        },
      });

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.warning(result.message);
      }
      if (setLoading) setLoading(false);
    } catch (error) {
      console.error(error);
      if (setLoading) setLoading(false);
    }
  }
};

export const handleUpdateQuantity = async (
  stock: number,
  item: TCartItemInCart,
  quantity: number,
  userId: string,
  base_url: string,
  setCart: (cart: TCartItem) => void,
  setLoading?: (loading: boolean) => void,
) => {
  if (quantity > stock) {
    toast.warning('Sorry, we do not have enough stock for your order.');
    return;
  }

  if (quantity === 0) {
    toast.info('Please select at least one item to proceed.');
    return;
  }

  if (quantity > 8) {
    toast.warning('You can order a maximum of 8 units per product.');
    return;
  }
  const { _id: productId } = item.productId;

  try {
    if (setLoading) setLoading(true);

    // Update cart on the server
    const updatedCart = await updateDataIntoDB(
      `${base_url}/my-cart/update-my-cart/${userId}`,
      {
        cart: { productId, quantity },
      },
    );

    setCart(updatedCart);

    const refetchedCart = await getDataFromDB(`${base_url}/my-cart/${userId}`);
    setCart(refetchedCart.data);

    if (setLoading) setLoading(false);
  } catch (error) {
    console.error('Error updating cart:', error);
    if (setLoading) setLoading(false);
  }
};

export const handleDeleteItem = async (
  userId: string,
  productId: string,
  base_url: string,
  setCart: (cart: TCartItem) => void,
  setLoading?: (loading: boolean) => void,
) => {
  try {
    if (setLoading) setLoading(true);
    const updatedCart = await deleteDataFromDB(
      `${base_url}/my-cart/remove-items-from-cart/${userId}`,
      {
        productId,
      },
    );
    setCart(updatedCart.data);
    if (setLoading) setLoading(false);
    toast.success(updatedCart.message);
  } catch (error) {
    console.error('Error deleting item:', error);
    if (setLoading) setLoading(false);
  }
};
