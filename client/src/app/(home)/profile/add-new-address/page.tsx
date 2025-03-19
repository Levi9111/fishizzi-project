'use client';
import { postToDB, updateDataIntoDB } from '@/api';
import { useUser } from '@/ContextProvider/Provider';
import { TAddressFormValues } from '@/Interface';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const AddressPage = () => {
  const { user, base_url } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAddressFormValues>({
    defaultValues: {
      fullName: user?.name || '',
      phoneNumber: user?.phoneNumber || '',
      landmark: '',
      division: '',
      city: '',
      policeStation: '',
      address: '',
    },
  });

  const onSubmit = async (data: TAddressFormValues) => {
    try {
      setLoading(true);

      const userAddress = {
        address: {
          userId: user?._id,
          ...data,
        },
      };

      const result = await postToDB(
        `${base_url}/address/create-address`,
        userAddress,
      );

      if (result.success) {
        const newAddressId = result.data._id;

        const updatedResult = await updateDataIntoDB(
          `${base_url}/users/update-address`,
          {
            userId: user?._id,
            newAddressId,
          },
        );

        console.log(updatedResult);

        if (updatedResult.success) {
          toast.success(updatedResult.message);
        } else {
          toast.warning(updatedResult.message);
        }
        reset({
          fullName: '',
          phoneNumber: '',
          landmark: '',
          division: '',
          city: '',
          policeStation: '',
          address: '',
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <div className='h-screen bg-white p-6 shadow-lg rounded-md mt-5'>
      <h2 className='text-2xl font-semibold mb-4'>Add New Address</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid md:grid-cols-2 gap-2'>
          <div className='space-y-3'>
            {/* Full Name */}
            <div>
              <label className='block font-medium'>Full Name</label>
              <input
                type='text'
                {...register('fullName', { required: 'Full Name is required' })}
                className='w-full p-2 border rounded-md'
              />
              {errors.fullName && (
                <p className='text-red-500'>{errors.fullName.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className='block font-medium'>Phone Number</label>
              <input
                type='tel'
                {...register('phoneNumber', {
                  required: 'Phone Number is required',
                })}
                className='w-full p-2 border rounded-md'
              />
              {errors.phoneNumber && (
                <p className='text-red-500'>{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Landmark */}
            <div>
              <label className='block font-medium'>Landmark</label>
              <input
                type='text'
                {...register('landmark')}
                className='w-full p-2 border rounded-md'
              />
            </div>
          </div>
          <div className='space-y-3'>
            {/* Division */}
            <div>
              <label className='block font-medium'>Division</label>
              <input
                type='text'
                {...register('division', { required: 'Division is required' })}
                className='w-full p-2 border rounded-md'
              />
              {errors.division && (
                <p className='text-red-500'>{errors.division.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className='block font-medium'>City</label>
              <input
                type='text'
                {...register('city', { required: 'City is required' })}
                className='w-full p-2 border rounded-md'
              />
              {errors.city && (
                <p className='text-red-500'>{errors.city.message}</p>
              )}
            </div>

            {/* Police Station */}
            <div>
              <label className='block font-medium'>Police Station</label>
              <input
                type='text'
                {...register('policeStation', {
                  required: 'Police Station is required',
                })}
                className='w-full p-2 border rounded-md'
              />
              {errors.policeStation && (
                <p className='text-red-500'>{errors.policeStation.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className='block font-medium'>Address</label>
              <textarea
                {...register('address', { required: 'Address is required' })}
                className='w-full p-2 border rounded-md'
              ></textarea>
              {errors.address && (
                <p className='text-red-500'>{errors.address.message}</p>
              )}
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-gray-700 hover:bg-gray-900 transition text-white py-2 rounded-md'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Save Address'}
        </button>
      </form>
    </div>
  );
};

export default AddressPage;
