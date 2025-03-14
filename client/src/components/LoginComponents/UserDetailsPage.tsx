import { useUser } from '@/ContextProvider/Provider';

import Link from 'next/link';

const UserDetailsPage = () => {
  const { user } = useUser();

  return (
    <div className='text-gray-700'>
      <h3 className='text-3xl'>Manage my account</h3>
      <div className='h-[200px] mt-3 flex gap-3'>
        <div className='h-full w-[350px] bg-white rounded-sm p-2 '>
          <div className='space-y-1'>
            <h3 className='text-xl mb-2 inline'>Personal Profile</h3>{' '}
            <h4>{user?.name}</h4>
            <p>{user?.email}</p>
            <p>
              Logged in with:{' '}
              <span className='capitalize'>{user?.provider}</span>
            </p>
          </div>
        </div>
        <div className='w-full h-full rounded-sm bg-white flex-1 p-2'>
          <h3 className='text-xl mb-2 '>Address book</h3>

          <button className='text-base bg-blue-500 p-2 rounded-md text-gray-200'>
            <Link href='/login/details/add-new-address'>Add new address</Link>
          </button>
        </div>
      </div>

      <div className='w-full h-max bg-white text-base p-2 rounded-md mt-3'>
        Show All the previous orders
      </div>
    </div>
  );
};

export default UserDetailsPage;
