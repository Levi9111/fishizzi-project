import { useUser } from '@/ContextProvider/Provider';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { postToDB } from '@/api';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, 'Price cannot be negative'),
  ),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().min(0, 'Stock cannot be negative'),
  ),
  category: z.string().min(1, 'Category is required'),
});

type ProductFormFields =
  | 'name'
  | 'description'
  | 'price'
  | 'stock'
  | 'category';

const AddProductsForm = () => {
  const { base_url } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: Record<string, unknown>) => {
    setLoading(true);
    data.price = data.price!.toString();
    data.stock = data.stock!.toString();
    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    formData.append('data', JSON.stringify({ product: data }));

    try {
      const response = await postToDB(
        `${base_url}/products/create-product`,
        formData,
      );

      const data = await response.json();
      toast(data.message);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading:', error);
      toast('Failed to add product.');
      setLoading(false);
    }
  };

  return (
    <div className=''>
      <h3 className='max-w-lg mx-auto mb-3 text-2xl font-semibold '>
        Add New Product
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='p-6 border rounded-lg shadow-md max-w-lg mx-auto bg-gray-50'
      >
        {[
          { label: 'Product Name', name: 'name', type: 'text' },
          { label: 'Description', name: 'description', type: 'textarea' },
          { label: 'Price', name: 'price', type: 'number' },
          { label: 'Stock', name: 'stock', type: 'number' },
          { label: 'Category', name: 'category', type: 'text' },
        ].map(
          ({
            label,
            name,
            type,
          }: {
            label: string;
            name: string;
            type: string;
          }) => (
            <div key={name} className='mb-4'>
              <label className='block mb-1 font-medium'>{label}</label>
              {type === 'textarea' ? (
                <textarea
                  {...register(name as ProductFormFields)}
                  className='w-full p-2 border rounded'
                />
              ) : (
                <input
                  type={type}
                  {...register(name as ProductFormFields)}
                  className='w-full p-2 border rounded'
                />
              )}
              {errors[name as keyof typeof errors] && (
                <p className='text-red-500 text-sm'>
                  {errors[name as keyof typeof errors]?.message}
                </p>
              )}
            </div>
          ),
        )}

        <div className='mb-4'>
          <label className='block mb-1 font-medium'>Upload Image</label>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className='w-full p-2 border rounded'
          />
        </div>

        <button
          type='submit'
          className='w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProductsForm;
