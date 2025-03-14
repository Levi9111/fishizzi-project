import { signIn } from 'next-auth/react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

const LoginRedirectPage = () => {
  return (
    <div className='relative flex items-center justify-center min-h-screen bg-[#0D47A1] p-4'>
      {' '}
      <div className='absolute inset-0 bg-white bg-opacity-80'></div>
      <div className='relative bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm text-center'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
          Login to Fishizzy
        </h2>
        <button
          onClick={() => signIn('google')}
          className='flex items-center justify-center w-full bg-red-600 text-white py-2 rounded-lg mb-4 hover:bg-red-700 transition'
        >
          <FaGoogle className='mr-2' /> Continue with Google
        </button>
        <button
          onClick={() => signIn('facebook')}
          className='flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
        >
          <FaFacebook className='mr-2' /> Continue with Facebook
        </button>
      </div>
    </div>
  );
};

export default LoginRedirectPage;
