'use client';
/*
import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { Home, PlusCircle, Truck } from 'lucide-react';

import bkash from '../../../../public/images/payment-images/bkash.png';
import nagad from '../../../../public/images/payment-images/nagad.png';
import cod from '../../../../public/images/payment-images/cod.png';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/ContextProvider/Provider';
import { getDataFromDB } from '@/api';
import Loader from '@/components/Loader';
import { TAddress } from '@/Interface';

const ProceedToPayment = () => {
  const { base_url, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [addresses, setAddresses] = useState<TAddress[]>([]);
  const [location, setLocation] = useState<'Inside Dhaka' | 'Outside Dhaka'>(
    'Inside Dhaka',
  );

  useEffect(() => {
    setLoading(true);
    const manageAddress = async () => {
      const result = await getDataFromDB(`${base_url}/address/${user?._id}`);
      setAddresses(result.data);
    };
    manageAddress();
    setLoading(false);
  }, [base_url, user?._id, setLoading]);

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

  

  if (loading) return <Loader />;

  return (
    <div className='min-h-screen bg-gray-100 '>
      <div className=' md:max-w-full max-w-[95%] w-fixedScreen mx-auto py-3 '>
        <div className=' flex flex-col md:flex-row items-start gap-6 p-4 md:p-8 w-[90%] mx-auto'>


          // Left Sidebar - Payment Options 

          <div className='w-full md:w-2/3 bg-white shadow-lg p-6 rounded-2xl'>
            <h2 className='text-xl font-semibold mb-4'>
              Choose Payment Method
            </h2>
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
                        checked
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300'
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
                        <span className='text-lg font-medium'>
                          {method.name}
                        </span>
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

          // Right Sidebar - Delivery Address & Order Summary 
          
          <div className='w-full md:w-1/3 space-y-6'>

            // Delivery Address Section 

            <div className='bg-white shadow-lg p-6 rounded-2xl'>
              <h2 className='text-xl font-semibold mb-4'>
                Choose Your Delivery Address
              </h2>
              {addresses?.length > 0 ? (
                // Find the default address
                addresses.some((address) => address.default) ? (
                  addresses
                    .filter((address) => address.default)
                    .map((defaultAddress) => (
                      <div
                        key={defaultAddress._id}
                        className='border p-4 rounded-lg bg-gray-100 flex flex-col gap-3'
                      >
                        <div className='flex items-center gap-3'>
                          <Home size={20} className='text-gray-700' />
                          <div>
                            <p className='text-gray-700 font-semibold'>
                              {defaultAddress.fullName}
                            </p>
                            <p className='text-gray-600 text-sm'>
                              {defaultAddress.address}, {defaultAddress.city},{' '}
                              {defaultAddress.division}
                            </p>
                            <p className='text-gray-500 text-xs'>
                              {defaultAddress.phoneNumber}
                            </p>
                          </div>
                        </div>
                        <Button className='w-full'>
                          <Link
                            href='/profile/manage-address'
                            className='flex items-center justify-center gap-2 w-full'
                          >
                            <PlusCircle size={18} />
                            Manage Default Address
                          </Link>
                        </Button>
                      </div>
                    ))
                ) : (
                  // No default address found
                  <Button className='w-full'>
                    <Link
                      href='/profile/manage-address'
                      className='flex items-center justify-center gap-2 w-full'
                    >
                      <PlusCircle size={18} />
                      Manage Default Address
                    </Link>
                  </Button>
                )
              ) : (
                // No addresses at all
                <Button className='w-full'>
                  <Link
                    href='/profile/add-new-address'
                    className='flex items-center justify-center gap-2 w-full'
                  >
                    <PlusCircle size={18} />
                    Add Delivery Address
                  </Link>
                </Button>
              )}
            </div>

            // Order Summary Section 

            <div className='bg-white shadow-lg p-6 rounded-2xl'>
              <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>

              // Total Price 

              <div className='flex justify-between text-lg font-medium'>
                <span>Total Price:</span>
                <span>৳ {totalPrice}</span>
              </div>

               // Delivery Charge Section 

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

              // Divider Line 

              <hr className='my-4 border-gray-300' />

              // Final Total 

              <div className='flex justify-between text-lg font-semibold'>
                <span>Total:</span>
                <span>৳ {finalTotal}</span>
              </div>

              // Proceed Button 

              <Button className='mt-4 w-full'>Confirm Order</Button>
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  );
};

export default ProceedToPayment;
*/

import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { Home, Truck } from 'lucide-react';
import cod from '../../../../public/images/payment-images/cod.png';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/ContextProvider/Provider';
import { getDataFromDB, postToDB, updateDataIntoDB } from '@/api';
import { TAddress, TProduct } from '@/Interface';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const ProceedToPayment = () => {
  const router = useRouter();
  const { base_url, user, cart } = useUser();
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<TAddress[]>([]);
  const [location, setLocation] = useState<'Inside Dhaka' | 'Outside Dhaka'>(
    'Inside Dhaka',
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const deliveryCharge = location === 'Inside Dhaka' ? 60 : 120;
  const finalTotal = totalPrice + deliveryCharge;

  useEffect(() => {
    setLoading(true);
    const manageAddress = async () => {
      const result = await getDataFromDB(`${base_url}/address/${user?._id}`);
      setAddresses(result.data);
    };

    const storedPrice = localStorage.getItem('totalPrice');
    if (storedPrice) {
      setTotalPrice(Number(storedPrice));
    }
    manageAddress();
    setLoading(false);
  }, [base_url, user?._id, setLoading]);

  const handleConfirmOrder = async () => {
    try {
      setLoading(true);

      const address = addresses.find((address) => address.default)?._id;

      if (!address) {
        toast.error('Please select a default address to proceed');
        return;
      }

      const products = cart!.itemsInCart.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));

      const confirmOrderData = {
        order: {
          userId: user?._id,
          products,
          totalPrice: finalTotal,
          location,
          address,
        },
      };

      const result = await postToDB(
        `${base_url}/orders/create-order`,
        confirmOrderData,
      );
      if (result.success && window !== undefined) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('order', JSON.stringify(result.data));
        }

        const orderedProducts = result.data.products.map(
          (product: TProduct) => product.productId._id,
        );

        // Remove ordered products from cart after confirminig order
        await updateDataIntoDB(
          `${base_url}/my-cart/remove-items-from-cart/${user?._id}`,
          {
            products: orderedProducts,
          },
        );
        localStorage.removeItem('cart');
        router.push('/confirm-order');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center p-6'>
      <div className='w-full max-w-5xl bg-white shadow-lg rounded-2xl flex flex-col md:flex-row p-6 gap-6'>
        {/* Left - Order Summary */}
        <div className='w-full md:w-1/2 space-y-6'>
          <div className='bg-gray-100 p-6 rounded-lg'>
            <h2 className='text-xl font-semibold mb-4'>Delivery Address</h2>
            {addresses?.length > 0 ? (
              addresses.some((address) => address.default) ? (
                addresses
                  .filter((address) => address.default)
                  .map((defaultAddress) => (
                    <div
                      key={defaultAddress._id}
                      className='border p-4 rounded-lg bg-white flex flex-col gap-3'
                    >
                      <div className='flex items-center gap-3'>
                        <Home size={20} className='text-gray-700' />
                        <div>
                          <p className='text-gray-700 font-semibold'>
                            {defaultAddress.fullName}
                          </p>
                          <p className='text-gray-600 text-sm'>
                            {defaultAddress.address}, {defaultAddress.city},{' '}
                            {defaultAddress.division}
                          </p>
                          <p className='text-gray-500 text-xs'>
                            {defaultAddress.phoneNumber}
                          </p>
                        </div>
                      </div>
                      <Button className='w-full'>
                        <Link
                          href='/profile/manage-address'
                          className='flex items-center justify-center gap-2 w-full'
                        >
                          Manage Default Address
                        </Link>
                      </Button>
                    </div>
                  ))
              ) : (
                <Button className='w-full'>
                  <Link
                    href='/profile/manage-address'
                    className='flex items-center justify-center gap-2 w-full'
                  >
                    Manage Default Address
                  </Link>
                </Button>
              )
            ) : (
              <Button className='w-full'>
                <Link
                  href='/profile/add-new-address'
                  className='flex items-center justify-center gap-2 w-full'
                >
                  Add Delivery Address
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Right - Payment & Order Summary */}
        <div className='w-full md:w-1/2 space-y-6'>
          <div className='bg-gray-100 p-6 rounded-lg'>
            <h2 className='text-xl font-semibold mb-4'>Payment Method</h2>
            <div className='flex items-center gap-4 border p-4 rounded-lg bg-white'>
              <Image src={cod} alt='Cash on Delivery' width={50} height={50} />
              <span className='text-lg font-medium'>Cash on Delivery</span>
            </div>
          </div>

          <div className='bg-gray-100 p-6 rounded-lg'>
            <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
            <div className='flex justify-between text-lg font-medium'>
              <span>Total Price:</span>
              <span>৳ {totalPrice}</span>
            </div>
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
            <hr className='my-4 border-gray-300' />
            <div className='flex justify-between text-lg font-semibold'>
              <span>Total:</span>
              <span>৳ {finalTotal}</span>
            </div>
            <Button
              className='mt-4 w-full'
              onClick={handleConfirmOrder}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Confirm Order'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProceedToPayment;
