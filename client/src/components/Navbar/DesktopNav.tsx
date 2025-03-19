// TODO: Add HelpCircle functionality later for user support
// import { HelpCircle } from 'lucide-react';

import Image from 'next/image';
import logo from '../../../public/logo/logo.png';
import { Search, ShoppingCart, Truck, User } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { TUser } from '@/Interface';

const DesktopNav = ({
  user,
  totalItemsInCart,
}: {
  user: TUser | null;
  totalItemsInCart: number;
}) => {
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
      <nav>
        <ul className='flex items-center gap-6 text-lg font-medium'>
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

      {/* Search Bar */}
      <div className='relative w-80'>
        <form className='flex items-center relative w-full'>
          <Input
            type='text'
            placeholder='Search products'
            className='pr-12 border-0 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-400'
          />
          <Button
            type='submit'
            className='absolute top-1/2  transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-md right-0 w-9'
          >
            <Search className='w-5 h-5' />
          </Button>
        </form>
      </div>

      {/* Delivery Address */}
      <div className='flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition'>
        <Truck className='w-5 h-5' />
        <p className='hidden xl:block text-sm'>Select your delivery address</p>
      </div>

      {/* User Info */}
      <div className='flex items-center gap-4'>
        {/* Language Selector */}
        <div className='flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition'>
          <p className='text-lg'>বাংলা</p>
        </div>

        {/* User Icon */}
        <Link href={user ? '/profile' : '/login'}>
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
