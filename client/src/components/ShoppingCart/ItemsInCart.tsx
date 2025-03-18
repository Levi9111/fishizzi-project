import { deleteDataFromDB, getDataFromDB, updateDataIntoDB } from '@/api';
import { useUser } from '@/ContextProvider/Provider';
import { TCartItemInCart, Product } from '@/Interface';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const ItemsInCart = ({
  item,
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  item: TCartItemInCart;
}) => {
  const { user, base_url, setCart } = useUser();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { _id: productId } = item.productId;
      const res = await getDataFromDB(`${base_url}/products/${productId}`);
      setProduct(res.data);
    };

    fetchProduct();
  }, [item.productId, base_url]);

  const handleUpdateQuantity = async (
    item: TCartItemInCart,
    quantity: number,
  ) => {
    if (product && quantity > +product.stock) {
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
      setLoading(true);

      const res = await getDataFromDB(`${base_url}/products/${productId}`);
      console.log(res);

      // Update cart on the server
      const updatedCart = await updateDataIntoDB(
        `${base_url}/my-cart/update-my-cart/${user?._id}`,
        {
          cart: { productId, quantity },
        },
      );

      // After updating the cart, set the updated cart to state
      setCart(updatedCart);

      // Optionally refetch cart data to ensure it's up-to-date (in case there are backend updates)
      const refetchedCart = await getDataFromDB(
        `${base_url}/my-cart/${user?._id}`,
      );
      setCart(refetchedCart.data);

      setLoading(false);
    } catch (error) {
      console.error('Error updating cart:', error);
      setLoading(false);
    }
  };

  const handleDeleteItem = async (productId: string) => {
    try {
      setLoading(true);
      // Delete item from the cart on the server
      const updatedCart = await deleteDataFromDB(
        `${base_url}/my-cart/remove-items-from-cart/${user?._id}`,
        {
          productId,
        },
      );
      // After deleting, set the updated cart to state
      setCart(updatedCart.data);
      setLoading(false);
      toast.success(updatedCart.message);
    } catch (error) {
      console.error('Error deleting item:', error);
      setLoading(false);
    }
  };

  if (loading || user === null)
    return (
      <div className='w-24 h-24 border-8 border-gray-200 border-t-blue-600 rounded-full animate-spin' />
    );

  return (
    <div
      key={item._id}
      className='flex items-center justify-between p-4 border-b flex-wrap'
    >
      <div className='flex items-center gap-4 w-full sm:w-auto'>
        <Image
          src={item.productId.productImgUrl}
          alt={item.productId.name}
          width={80}
          height={80}
          className='rounded-md max-h-[80px] '
        />
        <div>
          <h3 className='text-lg font-semibold'>{item.productId.name} </h3>
          <p className='text-gray-600'>Price: BDT {item.productId.price}</p>
          <p
            className={`text-sm font-semibold ${
              +item.productId.stock < 10 ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {+item.productId.stock < 10 ? 'Low Stock!' : 'In Stock'}
          </p>
        </div>
      </div>
      <div className='flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0'>
        {/* product id is being fetched as whole product because of  mongoose populate */}
        <Button
          variant='outline'
          onClick={() => handleUpdateQuantity(item, +item.quantity - 1)}
        >
          <Minus size={16} />
        </Button>
        <span className='text-lg'>{item.quantity}</span>
        <Button onClick={() => handleUpdateQuantity(item, +item.quantity + 1)}>
          <Plus size={16} />
        </Button>
        <Button
          variant='destructive'
          onClick={() => handleDeleteItem(item.productId._id)}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ItemsInCart;
