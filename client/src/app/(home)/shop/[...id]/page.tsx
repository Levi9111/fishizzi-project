'use client';

import { getDataFromDB } from '@/api';
import Loader from '@/components/Loader';
import { useUser } from '@/ContextProvider/Provider';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TProduct } from '@/Interface';
import { handleAddToCart } from '@/utils/handlers';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState<TProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, base_url } = useUser();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await getDataFromDB(`${base_url}/products/${params.id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [base_url, params.id]);

  if (loading) return <Loader />;
  if (!product)
    return (
      <div className='min-h-screen flex items-center justify-center'>
        Product not found
      </div>
    );

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 pb-6 '>
      <div className='max-w-6xl w-full bg-white shadow-lg rounded-lg p-8 md:p-12 flex flex-col md:flex-row gap-8'>
        {/* Product Image */}
        <div className='flex-shrink-0 w-full md:w-1/2'>
          <Image
            src={product.productImgUrl}
            alt={product.name}
            width={600}
            height={600}
            className='w-full h-auto object-cover rounded-lg'
          />
        </div>

        {/* Product Info */}
        <div className='flex flex-col w-full md:w-1/2'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>
            {product.name}
          </h1>
          <p className='text-lg text-gray-600 mt-4'>{product.description}</p>

          <div className='mt-6'>
            <p className='text-2xl font-bold text-green-600'>
              ৳{product.price}
            </p>
            <p
              className={`mt-2 text-lg ${
                +product.stock > 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {+product.stock > 0
                ? `In Stock: ${product.stock}`
                : 'Out of Stock'}
            </p>
          </div>

          {/* Add to Cart Button */}
          <div className='mt-8'>
            <button
              className='w-full bg-blue-600 text-white font-semibold text-lg px-6 py-3 rounded-lg hover:bg-blue-700 transition'
              onClick={() =>
                handleAddToCart(
                  user?._id as string,
                  product._id,
                  base_url,
                  +product.stock,
                  setLoading,
                )
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
