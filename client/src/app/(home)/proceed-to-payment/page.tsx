'use client';

import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { Home, PlusCircle, Truck } from 'lucide-react';

import bkash from '../../../../public/images/payment-images/bkash.png';
import nagad from '../../../../public/images/payment-images/nagad.png';
import cod from '../../../../public/images/payment-images/cod.png';
import Image from 'next/image';

const ProceedToPayment = () => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState(null); // Replace with user’s real address
  const [location, setLocation] = useState<'Inside Dhaka' | 'Outside Dhaka'>(
    'Inside Dhaka',
  );

  // Example: Total Price (Replace with actual cart total)
  const totalPrice = 2500;
  const deliveryCharge = location === 'Inside Dhaka' ? 60 : 120;
  const finalTotal = totalPrice + deliveryCharge;

  const paymentMethods = [
    {
      name: 'bKash',
      img: bkash,
    },
    {
      name: 'Nagad',
      img: nagad,
    },
    {
      name: 'Cash on Delivery',
      img: cod,
    },
  ];

  return (
    <div className='min-h-screen bg-gray-100 md:p-32  '>
      <div className=' flex flex-col md:flex-row items-start gap-6 p-4 md:p-8 '>
        {/* Left Sidebar - Payment Options */}
        <div className='w-full md:w-2/3 bg-white shadow-lg p-6 rounded-2xl'>
          <h2 className='text-xl font-semibold mb-4'>Choose Payment Method</h2>
          <RadioGroup
            value={selectedPayment}
            onChange={setSelectedPayment}
            className='space-y-4'
          >
            {paymentMethods.map((method) => (
              <RadioGroup.Option key={method.name} value={method.name}>
                {({ checked }) => (
                  <div
                    className={`flex items-center justify-between px-4 py-3 border rounded-lg cursor-pointer transition ${
                      checked ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    <div className='flex items-center gap-3'>
                      <div className=''>
                        <Image
                          src={method.img}
                          alt={method.name}
                          width={120}
                          height={120}
                          className='w-14 '
                        />
                      </div>
                      <span className='text-lg font-medium'>{method.name}</span>
                    </div>
                    {checked && (
                      <span className='text-blue-500 font-semibold'>✔</span>
                    )}
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>

        {/* Right Sidebar - Delivery Address & Order Summary */}
        <div className='w-full md:w-1/3 space-y-6'>
          {/* Delivery Address Section */}
          <div className='bg-white shadow-lg p-6 rounded-2xl'>
            <h2 className='text-xl font-semibold mb-4'>
              Choose Your Delivery Address
            </h2>
            {deliveryAddress ? (
              <div className='border p-4 rounded-lg flex items-center gap-3'>
                <Home size={20} className='text-gray-700' />
                <p className='text-gray-700'>{deliveryAddress}</p>
              </div>
            ) : (
              <Button
                className='flex items-center gap-2 w-full'
                onClick={() => alert('Add Address Modal')}
              >
                <PlusCircle size={18} />
                Add Delivery Address
              </Button>
            )}
          </div>

          {/* Order Summary Section */}
          <div className='bg-white shadow-lg p-6 rounded-2xl'>
            <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>

            {/* Total Price */}
            <div className='flex justify-between text-lg font-medium'>
              <span>Total Price:</span>
              <span>৳ {totalPrice}</span>
            </div>

            {/* Delivery Charge Section */}
            <div className='mt-4'>
              <h3 className='text-md font-medium mb-2'>Delivery Charge</h3>
              <RadioGroup
                value={location}
                onChange={setLocation}
                className='space-y-3'
              >
                {[
                  { name: 'Inside Dhaka', price: 60 },
                  { name: 'Outside Dhaka', price: 120 },
                ].map((option) => (
                  <RadioGroup.Option key={option.name} value={option.name}>
                    {({ checked }) => (
                      <div
                        className={`flex justify-between px-4 py-2 border rounded-lg cursor-pointer transition ${
                          checked
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300'
                        }`}
                      >
                        <div className='flex items-center gap-3'>
                          <Truck size={20} className='text-gray-600' />
                          <span className='text-md'>{option.name}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span className='text-gray-700'>
                            ৳ {option.price}
                          </span>
                          {checked && (
                            <span className='text-blue-500 font-semibold'>
                              ✔
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div>

            {/* Divider Line */}
            <hr className='my-4 border-gray-300' />

            {/* Final Total */}
            <div className='flex justify-between text-lg font-semibold'>
              <span>Total:</span>
              <span>৳ {finalTotal}</span>
            </div>

            {/* Proceed Button */}
            <Button className='mt-4 w-full'>Confirm Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProceedToPayment;
