import { useUser } from '@/ContextProvider/Provider';
import Link from 'next/link';

const UserDetailsPage = () => {
  const { user } = useUser();

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
            Mange Addresses
          </Link>
        </div>
      </div>

      {/* Orders Section */}
      <div className='bg-white rounded-lg shadow-lg p-6 mt-6'>
        <h3 className='text-2xl font-medium mb-4'>Previous Orders</h3>
        <p className='text-lg text-gray-700'>
          Show all your previous orders here.
        </p>
      </div>
    </div>
  );
};

export default UserDetailsPage;
