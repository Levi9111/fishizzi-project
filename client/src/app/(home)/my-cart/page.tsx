'use client';

import { useEffect } from 'react';
import { useUser } from '@/ContextProvider/Provider';
import { getDataFromDB } from '@/api';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Loader from '@/components/Loader';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import ItemsInCart from '@/components/ShoppingCart/ItemsInCart';
import { isEqual } from 'lodash';

// TODO: update product loading time is too much. Must reduce it later

// TODO Full of bugs.Surrender for now.
const CartPage = () => {
  const { user, base_url, cart, setCart, loading, setLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
      return;
    }
    const fetchCart = async () => {
      try {
        const response = await getDataFromDB(
          `${base_url}/my-cart/${user?._id}`,
        );
        if (!isEqual(response.data, cart)) {
          setCart(response.data);
          localStorage.setItem('cart', JSON.stringify(response.data));
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCart();
    }
  }, [user, base_url, router, setCart, cart, setLoading]);

  if (loading) return <Loader />;

  if (!user) return null;

  if (!cart || cart.itemsInCart?.length === 0) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <div className='text-center px-6'>
          <div className='mb-6'>
            <ShoppingCart className='mx-auto text-gray-600 text-[500px]' />
          </div>
          <p className='text-gray-500 text-lg mb-4'>
            Oops! Your cart is empty.
          </p>
          <p className='text-gray-400 text-md mb-6'>
            It looks like you haven&apos;t added anything yet. Start shopping
            and fill your cart with your favorite items.
          </p>
          <button>
            <Link
              href='/shop'
              className='px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center justify-center gap-2 mx-auto'
            >
              <FaHeart className='text-white' />
              Go to Shop
            </Link>
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = cart.itemsInCart?.reduce(
    (acc, item) => acc + parseFloat(item.productId.price) * item.quantity,
    0,
  );

  const handleTotalPrice = () => {
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  };

  return (
    <div className='p-6 min-h-screen bg-gray-100'>
      <h1 className='text-3xl font-bold text-center mb-6'>My Cart</h1>
      <div className='max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg'>
        {cart?.itemsInCart?.map((item) => (
          <ItemsInCart item={item} key={item._id} />
        ))}
        <div className='flex justify-between items-center mt-6 flex-wrap'>
          <h2 className='text-xl font-bold w-full sm:w-auto'>
            Total: BDT {totalPrice}
          </h2>
          <Button
            className='text-white px-6 py-2 rounded-lg w-full sm:w-auto'
            onClick={handleTotalPrice}
          >
            <Link href='/proceed-to-payment'>Proceed to Confirmation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
