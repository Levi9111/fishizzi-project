import { useUser } from '@/ContextProvider/Provider';
import React, { useState } from 'react';

export interface Product {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
}

interface InputChangeEvent
  extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {
  target: HTMLInputElement | (HTMLTextAreaElement & EventTarget);
}

const AdminContorlPage = () => {
  const { user, base_url } = useUser();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (event: InputChangeEvent) => {
    const { name, value } = event.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create FormData
    const formData = new FormData();
    if (selectedFile) {
      formData.append('img', selectedFile);
    }
    formData.append('product', JSON.stringify(product));

    try {
      const response = await fetch(`${base_url}/products/create-product`, {
        method: 'POST',
        body: formData,
      });

      const data: { message: string } = await response.json();
      console.log('Response:', data);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <div className=''>
      <div className='min-h-screen bg-white rounded-md p-3'>
        <h3 className='text-3xl'>Welcome {user?.name}</h3>
        Add and manage Products. Manage Users. Manage Blog.
      </div>
      <form
        onSubmit={handleSubmit}
        className='p-4 border rounded-lg shadow-md max-w-lg mx-auto'
      >
        <label className='block mb-2'>Product Name:</label>
        <input
          type='text'
          name='name'
          value={product.name}
          onChange={handleInputChange}
          className='w-full p-2 border rounded'
          required
        />

        <label className='block mt-2'>Description:</label>
        <textarea
          name='description'
          value={product.description}
          onChange={handleInputChange}
          className='w-full p-2 border rounded'
          required
        />

        <label className='block mt-2'>Price:</label>
        <input
          type='number'
          name='price'
          value={product.price}
          onChange={handleInputChange}
          className='w-full p-2 border rounded'
          required
        />

        <label className='block mt-2'>Stock:</label>
        <input
          type='number'
          name='stock'
          value={product.stock}
          onChange={handleInputChange}
          className='w-full p-2 border rounded'
          required
        />

        <label className='block mt-2'>Category:</label>
        <input
          type='text'
          name='category'
          value={product.category}
          onChange={handleInputChange}
          className='w-full p-2 border rounded'
          required
        />

        <label className='block mt-2'>Upload Image:</label>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='w-full p-2 border rounded'
          required
        />

        <button
          type='submit'
          className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminContorlPage;
