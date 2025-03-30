'use client';

import { getDataFromDB, updateDataIntoDB } from '@/api';
import { useUser } from '@/ContextProvider/Provider';
import { TOrderData } from '@/Interface';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Loader from '@/components/Loader';
import { toast } from 'sonner';

const SingleOrder = () => {
  const { base_url } = useUser();
  const params = useParams();
  const [singleOrder, setSingleOrder] = useState<TOrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleOrder = async () => {
      const response = await getDataFromDB(`${base_url}/orders/${params.id}`);
      setSingleOrder(response.data);
      console.log(response.data);
      setLoading(false);
    };
    fetchSingleOrder();
  }, [base_url, params.id]);

  if (loading || singleOrder === null) return <Loader />;

  const handleUpdateStatus = async (status: string) => {
    try {
      // TODO: on confirm order update the total stock of the ordered product
      const result = await updateDataIntoDB(
        `${base_url}/orders/update-order-status/${singleOrder._id}`,
        { status },
      );

      if (status === 'confirmed') {
      }

      if (result.success) {
        setSingleOrder({ ...singleOrder, status });
        toast.success('Status updated successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating order status');
    }
  };

  return (
    <div className='max-w-5xl w-full mx-auto p-4 flex flex-col gap-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Order Info */}
        <div className='bg-white p-4 shadow-md rounded-lg'>
          <h2 className='text-xl font-semibold'>Order Details</h2>
          <p className='text-gray-600'>Order ID: {singleOrder._id}</p>
          <p className='text-gray-600'>
            Tracking: {singleOrder.trackingNumber}
          </p>
          <p
            className={`font-semibold mt-2 ${
              singleOrder.status === 'pending'
                ? 'text-yellow-500'
                : singleOrder.status === 'confirmed'
                ? 'text-blue-500'
                : singleOrder.status === 'cancelled'
                ? 'text-red-500'
                : 'text-green-500'
            }`}
          >
            Status: {singleOrder.status}
          </p>
        </div>

        {/* User Info */}
        <div className='bg-white p-4 shadow-md rounded-lg flex items-center gap-4'>
          <Image
            src={singleOrder.userId.image}
            alt={singleOrder.userId.name}
            width={50}
            height={50}
            className='rounded-full'
          />
          <div>
            <h3 className='text-lg font-semibold'>{singleOrder.userId.name}</h3>
            <p className='text-gray-600'>
              Phone: {singleOrder.address.phoneNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Address Info */}
      <div className='bg-white p-4 shadow-md rounded-lg col-span-2'>
        <h3 className='text-lg font-semibold'>Shipping Address</h3>
        <p>{singleOrder.address.fullName}</p>
        <p>
          {singleOrder.address.address}, {singleOrder.address.city},{' '}
          {singleOrder.address.policeStation}
        </p>
        <p>{singleOrder.address.division}</p>
      </div>

      {/* Products List */}
      <div className='bg-white p-4 shadow-md rounded-lg col-span-2'>
        <h3 className='text-lg font-semibold mb-2'>Ordered Products</h3>
        {singleOrder.products.map((product) => (
          <div
            key={product.productId._id}
            className='flex flex-col md:flex-row gap-4 items-start justify-between border-b py-2'
          >
            <div className='flex gap-4 items-start'>
              <Image
                src={product.productId.productImgUrl}
                alt={product.productId.name}
                width={60}
                height={60}
                className='rounded-md'
              />
              <div>
                <p className='font-semibold'>{product.productId.name}</p>
                <p className='text-gray-600'>৳{product.productId.price}</p>
              </div>
            </div>
            <p className='bg-gray-200 px-3 py-1 rounded-md'>
              Quantity: {product.quantity}
            </p>
          </div>
        ))}
        <p className='mt-3 font-bold text-lg'>
          Total Price: ৳{singleOrder.totalPrice}
        </p>
      </div>

      {/* Order Actions */}
      {singleOrder.status !== 'delivered' &&
        singleOrder.status !== 'cancelled' && (
          <div className='col-span-2 flex flex-wrap gap-4'>
            {singleOrder.status === 'pending' && (
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded-md w-full md:w-auto'
                onClick={() => handleUpdateStatus('confirmed')}
              >
                Confirm Order
              </button>
            )}
            {(singleOrder.status === 'pending' ||
              singleOrder.status === 'confirmed') && (
              <button
                className='bg-green-500 text-white px-4 py-2 rounded-md w-full md:w-auto'
                onClick={() => handleUpdateStatus('delivered')}
              >
                Mark as Delivered
              </button>
            )}
            {(singleOrder.status === 'pending' ||
              singleOrder.status === 'confirmed') && (
              <button
                className='bg-red-500 text-white px-4 py-2 rounded-md w-full md:w-auto'
                onClick={() => handleUpdateStatus('cancelled')}
              >
                Cancel Order
              </button>
            )}
          </div>
        )}
    </div>
  );
};

export default SingleOrder;
