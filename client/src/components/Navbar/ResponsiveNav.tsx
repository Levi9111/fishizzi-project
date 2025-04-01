import Image from 'next/image';
import logo from '../../../public/logo/logo.png';
import { AlignLeft, ShoppingCart, User, X, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { TUser } from '@/Interface';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const ResponsiveNav = ({
  user,
  totalItemsInCart,
}: {
  user: TUser | null;
  totalItemsInCart: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <div className='nav-md:hidden flex items-center justify-between p-4 bg-gray-900 text-white relative'>
      {/* Logo */}
      <Link href='/'>
        <Image
          src={logo}
          alt='logo'
          width={60}
          height={50}
          className='cursor-pointer'
        />
      </Link>

      {/* Right Icons */}
      <div className='flex items-center gap-4'>
        <button className='relative'>
          <Link href='/my-cart'>
            <ShoppingCart className='w-6 h-6' />
          </Link>
          {totalItemsInCart > 0 && (
            <span className='absolute -top-2 -right-2 rounded-full h-5 w-5 bg-red-500 flex items-center justify-center text-xs font-bold'>
              {totalItemsInCart}
            </span>
          )}
        </button>

        <Link href={user ? '/profile' : '/login'} title={user ? user.name : ''}>
          {user ? (
            <Image
              src={user.image}
              alt={user.name}
              width={35}
              height={35}
              className='rounded-full'
            />
          ) : (
            <User className='w-6 h-6' />
          )}
        </Link>

        {/* Menu Toggle Button */}
        <button onClick={() => setIsOpen(true)}>
          <AlignLeft className='w-6 h-6' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-transform duration-300 z-50',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className='w-64 h-full bg-gray-800 text-white flex flex-col p-5 shadow-lg'>
          {/* Close Button */}
          <button className='self-end mb-5' onClick={() => setIsOpen(false)}>
            <X className='w-6 h-6' />
          </button>

          {/* Search Bar */}
          <div className='relative w-full mb-5'>
            <form className='flex items-center relative w-full'>
              <Input
                type='text'
                placeholder='Search products'
                className='pr-12 border-0 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400'
              />
              <Button
                type='submit'
                className='absolute top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-md right-0 w-9'
              >
                <Search className='w-5 h-5' />
              </Button>
            </form>
          </div>

          {/* Navigation Links */}
          <nav className='flex flex-col gap-4 text-lg'>
            <Link href='/' className='hover:text-yellow-400 transition' onClick={closeSidebar}>
              Home
            </Link>
            <Link href='/shop' className='hover:text-yellow-400 transition' onClick={closeSidebar}>
              Shop
            </Link>
            <Link href='/blog' className='hover:text-yellow-400 transition' onClick={closeSidebar}>
              Blog
            </Link>
            <Link href='/about' className='hover:text-yellow-400 transition' onClick={closeSidebar}>
              About
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveNav;