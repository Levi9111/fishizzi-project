import { useUser } from '@/ContextProvider/Provider';
import { signOut } from 'next-auth/react';

const MyAccountSidebar = () => {
  const { setUser } = useUser();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
    setUser(null);
  };

  return (
    <div className='bg-white rounded-md p-2 text-base min-h-screen'>
      <button
        onClick={handleLogout}
        className='bg-blue-500 rounded-md text-gray-100 px-3 py-2 w-full'
      >
        Logout
      </button>
    </div>
  );
};

export default MyAccountSidebar;
