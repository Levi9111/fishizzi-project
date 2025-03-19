import { useUser } from '@/ContextProvider/Provider';
import { signOut } from 'next-auth/react';

const MyAccountSidebar = () => {
  const { setUser } = useUser();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });

    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setUser(null);
  };

  return (
    <div className='bg-white rounded-md p-2 text-base h-screen mt-5'>
      <button
        onClick={handleLogout}
        className='bg-gray-700 hover:bg-gray-900 text-white rounded-lg shadow transition px-3 py-2 w-full'
      >
        Logout
      </button>
    </div>
  );
};

export default MyAccountSidebar;
