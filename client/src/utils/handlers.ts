import { getDataFromDB, postToDB, updateDataIntoDB } from '@/api';
import { TAddress, TCartItem, TCartItemInCart } from '@/Interface';
import { toast } from 'sonner';

const manageTotalItemsInCartFromLocalStorage = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '{}');
  const total =
    cart?.itemsInCart?.reduce(
      (acc: number, item: TCartItemInCart) => acc + item.quantity,
      0,
    ) || 0;
  localStorage.setItem('totalItemsInCart', JSON.stringify(total));

  // Emit custom event
  window.dispatchEvent(new Event('cart-updated'));
};

export const handleAddToCart = async (
  userId: string,
  productId: string,
  base_url: string,
  stock: number,
  setLoading?: (loading: boolean) => void,
) => {
  // 1. check the quantity of the product in the cart
  const result = await getDataFromDB(`${base_url}/my-cart/${userId}`);

  const existingProduct = result?.data?.itemsInCart.find(
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
        const updatedCart = await getDataFromDB(
          `${base_url}/my-cart/${userId}`,
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart.data));
        manageTotalItemsInCartFromLocalStorage();
      } else {
        toast.warning(result.message);
      }
      if (setLoading) setLoading(false);
      return result;
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
  // Early return if quantity is invalid
  if (setLoading) setLoading(false);
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

  try {
    if (setLoading) setLoading(true);

    const { _id: productId } = item.productId;

    // Update cart on the server
    const updatedData = await updateDataIntoDB(
      `${base_url}/my-cart/update-my-cart/${userId}`,
      {
        cart: { productId, quantity },
      },
    );

    // Refetch updated cart
    const refetchedCart = await getDataFromDB(`${base_url}/my-cart/${userId}`);
    localStorage.setItem('cart', JSON.stringify(refetchedCart.data));

    if (refetchedCart.success) {
      setCart(refetchedCart.data);
    } else {
      toast.error('Failed to update cart.');
    }

    return updatedData;
  } catch (error) {
    console.error('Error updating cart:', error);
    toast.error('Error updating cart.');
  } finally {
    if (setLoading) setLoading(false);
  }
};

export const handleDeleteItem = async (
  userId: string,
  productId: string,
  base_url: string,
  setCart: (cart: TCartItem) => void,
  setLoading: (loading: boolean) => void,
) => {
  try {
    setLoading(true);
    const updatedCart = await updateDataIntoDB(
      `${base_url}/my-cart/remove-items-from-cart/${userId}`,
      {
        products: [productId],
      },
    );
    if (updatedCart.success) {
      localStorage.setItem('cart', JSON.stringify(updatedCart.data));
      setCart(updatedCart.data);
      setLoading(false);
      toast.success(updatedCart.message);
    }
    toast.error(updatedCart.message);
    return updatedCart;
  } catch (error) {
    console.error('Error deleting item:', error);
    setLoading(false);
  }
};

export const fetchAddresses = async (
  url: string,
  setLoading: (loading: boolean) => void,
  setAddresses: (address: TAddress[]) => void,
) => {
  try {
    setLoading(true);
    const result = await getDataFromDB(url);
    if (result.success) {
      setAddresses(result.data);
    }
  } catch (error) {
    console.error('Error fetching addresses:', error);
  } finally {
    setLoading(false);
  }
};

export const handlers = {
  manageTotalItemsInCartFromLocalStorage,
};
