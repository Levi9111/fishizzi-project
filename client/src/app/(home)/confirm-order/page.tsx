'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TOrderData } from '@/Interface';
import Loader from '@/components/Loader';

const OrderConfirmation = () => {
  const [order, setOrder] = useState<TOrderData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem('order')!);
    console.log('Order data', orderData.products[0].productId);
    if (orderData) {
      setOrder(orderData);
      // localStorage.removeItem('order');
      setLoading(false);
    } else {
      console.log('No order found in localStorage.');
      setLoading(false);
    }
  }, []);

  if (!order) {
    return (
      <div className='text-center p-8'>
        <h2 className='text-2xl font-semibold'>No Order Data Found</h2>
        <p className='text-md text-gray-600'>
          Your order data could not be retrieved.
        </p>
      </div>
    );
  }

  if (loading || !order.products) return <Loader />;

  return (
    <div className='p-6 max-w-fixedScreen w-full mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
        <div className='col-span-full'>
          <h2 className='text-3xl font-bold text-gray-800 mb-6'>
            Order Confirmation
          </h2>
        </div>

        {/* Customer Details */}
        <div className='p-6 border rounded-md bg-gray-50'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>
            Customer Details
          </h3>
          <p>
            <strong>Name:</strong>{' '}
            <span className='ml-1'>{order.userId.name}</span>
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <span className='ml-1'>{order.userId.email}</span>
          </p>
        </div>

        {/* Shipping Address */}
        <div className='p-6 border rounded-md bg-gray-50'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>
            Shipping Address
          </h3>
          <p>
            <strong>Name:</strong>{' '}
            <span className='ml-1'>{order.address.fullName}</span>
          </p>
          <p>
            <strong>Phone:</strong>{' '}
            <span className='ml-1'>{order.address.phoneNumber}</span>
          </p>
          <p>
            <strong>Location:</strong>{' '}
            <span className='ml-1'>
              {order.address.city}, {order.address.division}
            </span>
          </p>
          <p>
            <strong>Address:</strong>{' '}
            <span className='ml-1'>{order.address.address}</span>
          </p>
          <p>
            <strong>Police Station:</strong>{' '}
            <span className='ml-1'>{order.address.policeStation}</span>
          </p>
        </div>

        {/* Products Ordered */}
        <div className='col-span-full p-6 border rounded-md bg-gray-50'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>
            Order Summary
          </h3>
          {order.products.map((product) => (
            <div
              key={product.productId._id}
              className='flex items-center gap-4 border-b py-3 last:border-b-0'
            >
              <Image
                src={product.productId.productImgUrl}
                alt={product.productId.name}
                width={80}
                height={80}
                className='w-20 h-20 object-cover rounded-md'
              />
              <div className='flex flex-col'>
                <h4 className='text-md font-semibold text-gray-800'>
                  {product.productId.name}
                </h4>
                <p className='text-sm text-gray-600'>
                  {product.productId.description.substring(0, 50)}...
                </p>
                <p>
                  <strong>Price:</strong> ৳{product.productId.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Total, Status, and Tracking Number */}
        <div className='col-span-full p-6 border rounded-md bg-gray-50'>
          <p className='text-lg font-semibold text-gray-800'>
            Total: ৳{order.totalPrice}
          </p>
          <p className='text-lg font-semibold text-gray-800'>
            Placed On:{' '}
            {new Date(order.createdAt).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'Asia/Dhaka',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </p>
          <p className='text-md font-semibold text-gray-800'>
            <strong>Tracking Number:</strong> {order.trackingNumber}
          </p>
          <p
            className={`text-md font-semibold ${
              order.status === 'pending' ? 'text-yellow-500' : 'text-green-500'
            }`}
          >
            Status: {order.status}
          </p>
        </div>

        {/* Continue Shopping Button */}
        <div className='col-span-full text-center'>
          <Button className='w-full'>
            <Link href='/shop'>Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
