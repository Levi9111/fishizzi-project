import { getDataFromDB } from '@/api';
import { useUser } from '@/ContextProvider/Provider';
import { TCartItemInCart, Product } from '@/Interface';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { handleDeleteItem, handleUpdateQuantity } from '@/utils/handlers';

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
          <Link href={`/shop/${item.productId._id}`}>
            <h3 className='text-lg font-semibold'>{item.productId.name} </h3>
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
        {/* product id is being fetched as whole product because of  mongoose populate */}
        <Button
          variant='outline'
          onClick={() =>
            handleUpdateQuantity(
              +product!.stock,
              item,
              +item.quantity - 1,
              user._id,
              base_url,
              setCart,
              setLoading,
            )
          }
        >
          <Minus size={16} />
        </Button>
        <span className='text-lg'>{item.quantity}</span>
        <Button
          onClick={() =>
            handleUpdateQuantity(
              +product!.stock,
              item,
              +item.quantity + 1,
              user._id,
              base_url,
              setCart,
              setLoading,
            )
          }
        >
          <Plus size={16} />
        </Button>
        <Button
          variant='destructive'
          onClick={() =>
            handleDeleteItem(
              user._id,
              item.productId._id,
              base_url,
              setCart,
              setLoading,
            )
          }
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ItemsInCart;
