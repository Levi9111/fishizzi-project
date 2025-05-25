'use client';

import { deleteDataFromDB, updateDataIntoDB } from '@/api';
import Loader from '@/components/Loader';
import { useUser } from '@/ContextProvider/Provider';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { fetchAddresses } from '@/utils/handlers';
import { toast } from 'sonner';

const ManageAddresses = () => {
  const { user, base_url, addresses, setAddresses } = useUser();
  const [loading, setLoading] = useState(true);
  const [selectDefault, setSelectDefault] = useState(false);

  useEffect(() => {
    if (user)
      fetchAddresses(
        `${base_url}/address/${user?._id}`,
        setLoading,
        setAddresses,
      );
  }, [base_url, user, setAddresses]);

  // Handle address deletion
  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteDataFromDB(`${base_url}/address/${id}`);
      setAddresses(addresses.filter((addr) => addr._id !== id));
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  // Handle setting default address
  const handleSetDefaultAddress = async (id: string) => {
    try {
      const updatedAddresses = addresses.map((addr) => ({
        ...addr,
        default: addr._id === id,
      }));
      setAddresses(updatedAddresses);
      const result = await updateDataIntoDB(
        `${base_url}/address/default-address/${id}`,
      );
      toast.info(result.message);
    } catch (error) {
      console.error('Error setting default address:', error);
      toast.error('Failed to set default address');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className='rounded-md mx-auto p-6 bg-gray-100 min-h-screen mt-5'>
      {/* Header */}
      <div className='bg-white p-4 rounded-lg shadow-md mb-4 text-center'>
        <h2 className='text-2xl font-semibold text-gray-700'>
          Manage Addresses
        </h2>
      </div>

      {/* Make Default Address Button */}
      <button
        onClick={() => setSelectDefault(!selectDefault)}
        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mb-4 transition'
      >
        {selectDefault ? 'Done' : 'Make Default Address'}
      </button>

      {/* Address List */}
      <div className='space-y-4'>
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div
              key={address._id}
              className={`border p-4 rounded-lg shadow-md transition ${
                address.default
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white'
              }`}
            >
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                {/* Address Info */}
                <div>
                  <h3 className='font-semibold text-lg text-gray-700'>
                    {address.fullName}
                  </h3>
                  <p className='text-gray-600'>
                    {address.address}, {address.city}, {address.division}
                  </p>
                  <p className='text-sm text-gray-500'>{address.phoneNumber}</p>
                </div>

                <div className='flex items-center md:justify-center gap-3 relative'>
                  {/* Default Address Radio Button */}
                  {selectDefault && (
                    <input
                      type='radio'
                      name='defaultAddress'
                      checked={address.default}
                      onChange={() => handleSetDefaultAddress(address._id)}
                      className='h-5 w-5 text-blue-600 cursor-pointer md:static absolute right-0 '
                    />
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteAddress(address._id)}
                    className='bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md transition text-sm '
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-600'>No addresses found.</p>
        )}
      </div>

      {/* Add New Address Button */}
      <div className='mt-6'>
        <Button
          className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition'
          onClick={() => (window.location.href = '/profile/add-new-address')}
        >
          Add New Address
        </Button>
      </div>
    </div>
  );
};

export default ManageAddresses;
