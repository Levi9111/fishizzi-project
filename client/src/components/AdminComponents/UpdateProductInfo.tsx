import { getDataFromDB } from '@/api';
import { useUser } from '@/ContextProvider/Provider';
import { UpdateProductInfoProps } from '@/Interface';
import { X } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

const UpdateProductInfo = ({
  formData,
  setFormData,
  setSelectedProduct,
  setLoading,
  setProducts,
}: UpdateProductInfoProps) => {
  const { base_url } = useUser();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!formData) return;

    const updatingData = {
      product: {
        name: formData.name,
        price: formData.price,
        category: formData.category,
        stock: formData.stock,
      },
    };

    try {
      setLoading(true);

      // TODO: reduce the code later
      const res = await fetch(
        `${base_url}/products/update-product/${formData._id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatingData),
        },
      );

      // const res = await updateInfoIntoDB(
      //   `${base_url}/products/update-product/${formData._id}`,
      //   updatingData,
      // );

      const data = await res.json();
      setLoading(false);

      toast.success(data.message);
      setSelectedProduct(null);
      setFormData(null);

      // Refresh product list after update
      const updatedData = await getDataFromDB(`${base_url}/products`);
      setProducts(updatedData.data);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.warning('An error occurred while updating');
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative h-auto max-h-[90vh] overflow-y-auto'>
        {/* Close Button */}
        <button
          onClick={() => {
            setSelectedProduct(null);
            setFormData(null);
          }}
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'
        >
          <X size={20} />
        </button>

        {/* Form */}
        <div className='flex flex-col gap-4'>
          <Image
            src={formData.productImgUrl!}
            alt={formData.name!}
            width={180}
            height={180}
            className='rounded-md mx-auto'
          />

          <label className='text-gray-700 font-semibold'>Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='border rounded px-3 py-2 w-full'
          />

          <label className='text-gray-700 font-semibold'>Description</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className='border rounded px-3 py-2 w-full'
          />

          <label className='text-gray-700 font-semibold'>Price (BDT)</label>
          <input
            type='number'
            name='price'
            value={formData.price}
            onChange={handleChange}
            className='border rounded px-3 py-2 w-full'
          />

          <label className='text-gray-700 font-semibold'>Stock</label>
          <input
            type='number'
            name='stock'
            value={formData.stock}
            onChange={handleChange}
            className='border rounded px-3 py-2 w-full'
          />

          <button
            onClick={handleUpdate}
            className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full'
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductInfo;
