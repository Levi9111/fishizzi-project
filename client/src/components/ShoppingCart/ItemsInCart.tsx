import { useUser } from '@/ContextProvider/Provider';
import { TCartItemInCart, Product } from '@/Interface';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { handleDeleteItem, handleUpdateQuantity } from '@/utils/handlers';
import { getDataFromDB } from '@/api';

// TODO: Too many bugs. Fix for now
const ItemsInCart = ({ item }: { item: TCartItemInCart }) => {
  const { user, base_url, setCart, setLoading, setTotalItemsInCart } =
    useUser();
  const [product, setProduct] = useState<Product | null>(null);

  const { _id: productId } = item.productId;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // setLoading(true);
        const res = await getDataFromDB(`${base_url}/products/${productId}`);
        if (res.data) {
          setProduct(res.data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, base_url, setLoading]);

  if (!user) {
    setLoading(false);
    return;
  }

  const updateQuantity = async (newQty: number) => {
    if (!product || !product.stock) {
      setLoading(true);
    }

    const result = await handleUpdateQuantity(
      Number(product?.stock),
      item,
      newQty,
      user._id,
      base_url,
      setCart,
      setLoading,
    );
    const totalQuantity = result.data.itemsInCart.reduce(
      (acc: number, item: TCartItemInCart) => acc + item.quantity,
      0,
    );
    setTotalItemsInCart(totalQuantity);
  };

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
        <span className='text-lg'>{item.quantity}</span>
        <Button onClick={() => updateQuantity(+item.quantity + 1)}>
          <Plus size={16} />
        </Button>
        <Button
          variant='destructive'
          onClick={async () => {
            const result = await handleDeleteItem(
              user._id,
              item.productId._id,
              base_url,
              setCart,
              setLoading,
            );

            const totalQuantity = result.data.itemsInCart.reduce(
              (acc: number, item: TCartItemInCart) => acc + item.quantity,
              0,
            );
            setTotalItemsInCart(totalQuantity);
          }}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ItemsInCart;
