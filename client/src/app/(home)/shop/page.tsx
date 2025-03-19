'use client';
import { useState, useEffect } from 'react';
import { getDataFromDB } from '@/api';
import { useUser } from '@/ContextProvider/Provider';
import { TProduct } from '@/Interface';
import Image from 'next/image';
import Loader from '@/components/Loader';
import { AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { handleAddToCart } from '@/utils/handlers';
import { useRouter } from 'next/navigation';

// TODO: bug: cart is not being updated properly
const ShopPage = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const { user, base_url } = useUser();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
      return;
    }
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getDataFromDB(`${base_url}/products`);
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [base_url, user, router]);

  if (loading) return <Loader />;

  return (
    <div className='p-4 bg-gray-100   '>
      <h1 className='text-3xl font-bold text-center mb-6'>Shop Our Products</h1>
      <div className='min-h-screen'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.map((product) => (
            <div
              key={product._id}
              className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200'
            >
              <Image
                src={product.productImgUrl}
                alt={product.name}
                width={280}
                height={280}
                className='w-full h-52 object-cover'
              />
              <div className='p-4'>
                {/* Product Name */}
                <Link href={`/shop/${product._id}`}>
                  <h3 className='text-2xl font-bold text-gray-900 truncate '>
                    {product.name}
                  </h3>
                </Link>

                {/* Product Description */}
                <p className='text-gray-500 text-sm mt-1 line-clamp-2'>
                  {product.description}
                </p>

                {/* Price and Stock Info */}
                <div className='flex justify-between items-center mt-4'>
                  <span className='text-lg font-semibold text-green-600'>
                    ৳{product.price}
                  </span>

                  {/* Stock Status */}
                  {+product.stock < 10 ? (
                    <span className='text-red-500 flex items-center gap-1 text-sm font-medium'>
                      <AlertCircle className='w-4 h-4' />
                      Only {product.stock} left!
                    </span>
                  ) : (
                    <span className='text-green-600 flex items-center gap-1 text-sm font-medium'>
                      <CheckCircle className='w-4 h-4' />
                      In stock: {product.stock}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() =>
                    handleAddToCart(
                      user?._id as string,
                      product._id,
                      base_url,
                      +product.stock,
                      setLoading,
                    )
                  }
                  className='mt-4 w-full py-2 px-4 bg-gray-700 hover:bg-gray-900 text-white font-semibold rounded-lg  transition duration-200 active:scale-95'
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
