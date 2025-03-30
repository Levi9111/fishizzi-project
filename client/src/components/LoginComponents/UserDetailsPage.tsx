import { getDataFromDB, updateDataIntoDB } from '@/api';
import { useUser } from '@/ContextProvider/Provider';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Slider from 'react-slick'; // Import Slider for the carousel

const UserDetailsPage = () => {
  const { user, base_url } = useUser();
  const [previousOrders, setPreviousOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPreviousOrders = async () => {
      const result = await getDataFromDB(
        `${base_url}/orders/my-orders/${user?._id}`,
      );
      setPreviousOrders(result.data);
      setLoading(false);
    };
    fetchMyPreviousOrders();
  }, [user?._id, base_url]);

  // Handle order cancellation
  const handleCancelOrder = async (orderId: string) => {
    try {
      const result = await updateDataIntoDB(
        `${base_url}/orders/update-order-status/${orderId}`,
        {
          status: 'cancelled',
        },
      );

      if (result.success) {
        setLoading(true);
        const result = await getDataFromDB(
          `${base_url}/orders/my-orders/${user?._id}`,
        );
        setPreviousOrders(result.data);
        setLoading(false);
      } else {
        console.log('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  // Slider settings
  const sliderSettings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className='text-gray-800 max-w-screen-lg mx-auto p-6'>
      <h3 className='text-4xl font-semibold text-blue-600 mb-6'>
        Manage My Account
      </h3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Personal Profile Section */}
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h3 className='text-2xl font-medium mb-4'>Personal Profile</h3>
          <div className='space-y-2'>
            <h4 className='text-xl font-semibold text-blue-500'>
              {user?.name}
            </h4>
            <p className='text-lg text-gray-600'>{user?.email}</p>
            <p className='text-lg'>
              Logged in with:{' '}
              <span className='capitalize text-blue-500'>{user?.provider}</span>
            </p>
          </div>
        </div>

        {/* Address Book Section */}
        <div className='bg-white rounded-lg shadow-lg p-6 flex flex-col'>
          <h3 className='text-2xl font-medium mb-4'>Address Book</h3>
          <Link
            href='/profile/manage-address'
            className='bg-gray-700 text-white py-2 px-4 rounded-md text-lg font-semibold hover:bg-gray-900 transition duration-300'
          >
            Manage Addresses
          </Link>
        </div>
      </div>

      {/* Orders Section */}
      <div className='bg-white rounded-lg shadow-lg p-6 mt-6'>
        <h3 className='text-2xl font-medium mb-4'>Previous Orders</h3>
        <p className='text-lg text-gray-700'>
          Show all your previous orders here.
        </p>

        {/* Slider for orders */}
        <div className='mt-4 bg-gray-100 p-3 rounded-md border-2 border-grey-300 '>
          {loading ? (
            <div className='flex items-center justify-center h-24 w-full'>
              <div className='w-12 h-12 border-2 border-gray-200 border-t-blue-900 rounded-full animate-spin' />
            </div>
          ) : (
            <Slider {...sliderSettings}>
              {previousOrders.length > 0 ? (
                previousOrders.map((order) => (
                  <div
                    key={order._id}
                    className='border-b p-4 shadow-[inset_0_1px_4px_0_rgb(0_0_0_/_0.1)] '
                  >
                    <h4 className='text-xl font-semibold'>{`Order #${order._id}`}</h4>
                    <p className='text-md text-gray-600'>
                      Total Price: ৳{order.totalPrice}
                    </p>
                    <p className='text-md text-gray-600'>
                      Tracking Number: {order.trackingNumber}
                    </p>

                    {/* Order status with colors */}
                    <p className={`text-md font-semibold mt-2 capitalize`}>
                      Status:{' '}
                      <span
                        className={
                          order.status === 'pending'
                            ? 'text-yellow-500'
                            : order.status === 'confirmed'
                            ? 'text-blue-500'
                            : order.status === 'cancelled'
                            ? 'text-red-500'
                            : 'text-green-500'
                        }
                      >
                        {order.status}.
                      </span>
                    </p>

                    {/* Cancel button if the order is pending */}
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className='text-red-500 mt-2 underline'
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className='text-lg text-gray-500'>
                  No previous orders found.
                </p>
              )}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
