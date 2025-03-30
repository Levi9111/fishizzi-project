'use client';
import { getDataFromDB } from '@/api';
import { useUser } from '@/ContextProvider/Provider';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TOrderData } from '@/Interface';
import Loader from '@/components/Loader';

const ManageOrders = () => {
  const { base_url } = useUser();
  const [orders, setOrders] = useState<TOrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await getDataFromDB(
          `${base_url}/orders${
            filterStatus === 'all' ? '' : `?status=${filterStatus}`
          }`,
        );
        if (result.success) {
          setOrders(result.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [base_url, filterStatus]);

  return (
    <div className='max-w-fixedScreen w-full mx-auto p-6'>
      <h3 className='text-3xl font-semibold text-gray-800 mb-4'>
        Manage All Orders
      </h3>

      {/* Filter Dropdown */}
      <div className='flex justify-end mb-4'>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className='border p-2 rounded-md text-gray-700 shadow-sm'
        >
          <option value='all'>All Orders</option>
          <option value='pending'>Pending</option>
          <option value='confirmed'>Confirmed</option>
          <option value='cancelled'>Cancelled</option>
          <option value='delivered'>Delivered</option>
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <Loader />
      ) : orders.length === 0 ? (
        <p className='text-center text-gray-500'>No orders found.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {orders.map((order) => (
            <Link href={`/manage-orders/${order._id}`} key={order._id}>
              <div className='border rounded-lg shadow-md p-4 hover:shadow-lg transition bg-gray-100'>
                <h4 className='text-lg font-semibold text-gray-800'>
                  Order ID: {order._id}
                </h4>
                <p className='text-sm text-gray-600'>
                  Tracking ID: {order.trackingNumber}
                </p>
                <p
                  className={`text-sm font-semibold mt-1 ${
                    order.status === 'pending'
                      ? 'text-yellow-500'
                      : order.status === 'confirmed'
                      ? 'text-blue-500'
                      : order.status === 'cancelled'
                      ? 'text-red-500'
                      : 'text-green-500'
                  }`}
                >
                  Status: {order.status}
                </p>
                <p className='text-gray-700'>Total: ৳{order.totalPrice}</p>
                <div className='flex space-x-2 mt-3'>
                  {order.products.map((product) => (
                    <Image
                      key={product._id}
                      src={product.productId.productImgUrl}
                      alt={product.productId.name}
                      width={300}
                      height={200}
                      className='w-16 h-16 object-cover rounded-md'
                    />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
