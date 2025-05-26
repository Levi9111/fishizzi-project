'use client';
import Image from 'next/image';
import logo from '../../../public/logo/logo.png';
import { ShoppingCart, Truck, User } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/ContextProvider/Provider';

const DesktopNav = () => {
  const { user, totalItemsInCart } = useUser();
  return (
    <div className='hidden md:flex justify-between items-center w-full py-3 px-6 bg-gray-900 text-white rounded-lg shadow-lg'>
      {/* Logo */}
      <Link href='/'>
        <Image
          src={logo}
          alt='logo'
          width={70}
          height={60}
          className='cursor-pointer'
        />
      </Link>

      {/* Navigation Links */}
      <nav className='flex-1 ml-8'>
        <ul className='flex items-center gap-8 text-lg font-medium'>
          <li className='hover:text-yellow-400 transition'>
            <Link href='/'>Home</Link>
          </li>
          <li className='hover:text-yellow-400 transition'>
            <Link href='/shop'>Shop</Link>
          </li>
          <li className='hover:text-yellow-400 transition'>
            <Link href='/blog'>Blog</Link>
          </li>
          <li className='hover:text-yellow-400 transition'>
            <Link href='/about'>About</Link>
          </li>
        </ul>
      </nav>

      {/* Right Section */}
      <div className='flex items-center gap-6'>
        {/* Delivery Address */}
        <Link
          href='/profile/manage-address'
          className='flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition'
          title='Select your delivery address'
        >
          <Truck className='w-5 h-5' />
          <p className='hidden xl:block text-sm'>
            Select your delivery address
          </p>
        </Link>

        {/* Language Selector */}
        <div className='flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition'>
          <p className='text-lg'>বাংলা</p>
        </div>

        {/* User Icon */}
        <Link href={user ? '/profile' : '/login'} title={user ? user.name : ''}>
          {user ? (
            <Image
              src={user.image}
              alt={user.name}
              width={40}
              height={40}
              className='rounded-full border border-gray-600'
            />
          ) : (
            <User className='w-6 h-6' />
          )}
        </Link>

        {/* Shopping Cart */}
        <div className='relative cursor-pointer'>
          <Link href='/my-cart'>
            <ShoppingCart className='w-6 h-6' />
          </Link>
          {totalItemsInCart > 0 && (
            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full'>
              {totalItemsInCart}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
