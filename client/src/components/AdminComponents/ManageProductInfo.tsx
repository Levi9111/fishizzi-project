import { getDataFromDB } from '@/api';
import { useUser } from '@/ContextProvider/Provider';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader';
import { TProduct } from '@/Interface';
import Image from 'next/image';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import UpdateProductInfo from './UpdateProductInfo';

const ManageProductInfo = () => {
  const { base_url } = useUser();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [formData, setFormData] = useState<TProduct | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getDataFromDB(`${base_url}/products`);
      setProducts(data.data);
      setLoading(false);
    };

    fetchData();
  }, [base_url]);

  if (loading) return <Loader />;

  const handleDelete = async (id: string) => {
    // TODO: remove window and reduce delete code later
    if (!window.confirm('Are you sure you want to delete this product?'))
      return;

    try {
      setLoading(true);
      const res = await fetch(`${base_url}/products/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      setLoading(false);
      toast.success(data.message);

      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error(error);
      toast.warning('Error deleting product');
    }
  };

  return (
    <div className='space-y-4 px-4'>
      {/* Product List */}
      {!selectedProduct &&
        products.map((product) => (
          <div
            key={product._id}
            className='border rounded-md border-gray-300 p-4 grid md:grid-cols-[128px_1fr_auto] grid-cols-1 md:gap-4 gap-3 md:h-40 w-full shadow-sm'
          >
            {/* Image Section */}
            <div className='h-32 w-32 md:w-full overflow-hidden rounded-md'>
              <Image
                src={product.productImgUrl}
                alt={product.name}
                width={128}
                height={128}
                className='h-full w-full object-cover'
              />
            </div>

            {/* Product Info */}
            <div className='flex flex-col justify-between text-center md:text-left'>
              <h3 className='text-lg font-semibold text-gray-900'>
                {product.name}
              </h3>
              <p className='text-sm text-gray-700'>{product.description}</p>
              <p className='text-md font-bold text-blue-600'>
                Price: {product.price} BDT
              </p>
              <p
                className={`text-sm font-medium ${
                  +product.stock > 10 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                Stock: {product.stock}{' '}
                {+product.stock > 10 ? '✅' : '⚠️ Low Stock'}
              </p>
            </div>

            {/* Buttons */}
            <div className='flex items-center md:flex-col flex-row justify-center gap-2'>
              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setFormData(product);
                }}
                className='flex items-center gap-2 bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition w-full'
              >
                <Pencil size={18} />
                <span className='text-sm font-medium'>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className='flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-700 transition w-full'
              >
                <Trash2 size={18} />
                <span className='text-sm font-medium'>Delete</span>
              </button>
            </div>
          </div>
        ))}

      {/* Modal */}

      {selectedProduct && formData && (
        <UpdateProductInfo
          formData={formData}
          // @ts-expect-error: Type mismatch due to formData type
          setFormData={setFormData}
          setSelectedProduct={setSelectedProduct}
          setProducts={setProducts}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default ManageProductInfo;
