import { useUser } from '@/ContextProvider/Provider';
import { TCartItemInCart, Product } from '@/Interface';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { handleDeleteItem, handleUpdateQuantity } from '@/utils/handlers';
import { getDataFromDB } from '@/api';

const ItemsInCart = ({ item }: { item: TCartItemInCart }) => {
  const { user, base_url, setCart, setTotalItemsInCart } = useUser();
  const [product, setProduct] = useState<Product | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [itemLoading, setItemLoading] = useState(false);
  const { _id: productId } = item.productId;

  useEffect(() => {
    const fetchProduct = async () => {
      setPageLoading(true); // Start loader

      try {
        const res = await getDataFromDB(`${base_url}/products/${productId}`);
        if (res.data) {
          setProduct(res.data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setPageLoading(false); // End loader
      }
    };

    fetchProduct();
  }, [productId, base_url]);

  if (!user) return null; // Guard clause (no state update here)

  const updateQuantity = async (newQty: number) => {
    if (!product || !product.stock) {
      setPageLoading(true);
    }
    setItemLoading(true);
    const result = await handleUpdateQuantity(
      Number(product?.stock),
      item,
      newQty,
      user._id,
      base_url,
      setCart,
      setItemLoading,
    );
    const totalQuantity = result.data.itemsInCart.reduce(
      (acc: number, item: TCartItemInCart) => acc + item.quantity,
      0,
    );
    setTotalItemsInCart(totalQuantity);
    setItemLoading(false);
  };

  return (
    <div
      key={item._id}
      className='flex items-center justify-between p-4 border-b flex-wrap '
    >
      {pageLoading ? (
        <div className='w-full py-8 flex items-center justify-center'>
          <span className='w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin'></span>
        </div>
      ) : (
        <>
          <div className='flex items-center gap-4 w-full sm:w-auto'>
            <Image
              src={item.productId.productImgUrl}
              alt={item.productId.name}
              width={80}
              height={80}
              className='rounded-md max-h-[80px]'
            />
            <div>
              <Link href={`/shop/${item.productId._id}`}>
                <h3 className='text-lg font-semibold'>{item.productId.name}</h3>
              </Link>
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
            <Button
              variant='outline'
              onClick={() => updateQuantity(+item.quantity - 1)}
            >
              <Minus size={16} />
            </Button>
            <div className='w-8 h-8 flex items-center justify-center'>
              {itemLoading ? (
                <span className='w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin' />
              ) : (
                <span className='text-lg'>{item.quantity}</span>
              )}
            </div>

            <Button onClick={() => updateQuantity(+item.quantity + 1)}>
              <Plus size={16} />
            </Button>
            <Button
              variant='destructive'
              onClick={async () => {
                setItemLoading(true);

                const result = await handleDeleteItem(
                  user._id,
                  item.productId._id,
                  base_url,
                  setCart,
                  setItemLoading,
                );

                const totalQuantity = result.data.itemsInCart.reduce(
                  (acc: number, item: TCartItemInCart) => acc + item.quantity,
                  0,
                );
                setTotalItemsInCart(totalQuantity);
                setItemLoading(false);
              }}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemsInCart;
