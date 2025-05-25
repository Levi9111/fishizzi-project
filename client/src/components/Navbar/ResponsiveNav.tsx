'use client';
import Image from 'next/image';
import logo from '../../../public/logo/logo.png';
import {
  AlignLeft,
  ShoppingCart,
  User,
  X,
  Search,
  MoreVertical,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useUser } from '@/ContextProvider/Provider';

const ResponsiveNav = () => {
  const { user, totalItemsInCart } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

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

      {/* Search Bar */}
      <div className='relative flex-1 mx-4'>
        <form className='flex items-center relative w-full'>
          <Input
            type='text'
            placeholder='Search products'
            className='pr-12 border-0 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 w-full'
          />
          <Button
            type='submit'
            className='absolute top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-md right-0 w-9'
          >
            <Search className='w-5 h-5' />
          </Button>
        </form>
      </div>

      {/* Right Icons */}
      <div className='relative'>
        <button onClick={toggleModal}>
          <MoreVertical className='w-6 h-6 inline-block animate-scaleText text-6xl' />
        </button>
        {isModalOpen && (
          <div className='absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg py-2relative z-20'>
            <button
              className='block w-full text-left px-4 py-2 hover:bg-gray-700'
              onClick={closeModal}
            >
              <Link href='/my-cart'>
                <ShoppingCart className='w-6 h-6 inline-block mr-2 relative' />
                Cart
                {totalItemsInCart > 0 && (
                  <span className='ml-2 rounded-full h-4 w-4 bg-red-500 flex items-center justify-center text-[10px] font-bold absolute top-1 left-1'>
                    {totalItemsInCart}
                  </span>
                )}
              </Link>
            </button>
            <button
              className='block w-full text-left px-4 py-2 hover:bg-gray-700'
              onClick={closeModal}
            >
              <Link
                href={user ? '/profile' : '/login'}
                title={user ? user.name : ''}
              >
                {user ? (
                  <>
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={20}
                      height={20}
                      className='rounded-full inline-block mr-2'
                    />
                    {user.name}
                  </>
                ) : (
                  <>
                    <User className='w-6 h-6 inline-block mr-2' />
                    Login
                  </>
                )}
              </Link>
            </button>
            <button
              className='block w-full text-left px-4 py-2 hover:bg-gray-700'
              onClick={() => {
                closeModal();
                setIsOpen(true);
              }}
            >
              <AlignLeft className='w-6 h-6 inline-block mr-2' />
              Menu
            </button>
          </div>
        )}
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
          <button className='self-end mb-5' onClick={closeSidebar}>
            <X className='w-6 h-6' />
          </button>

          {/* Navigation Links */}
          <nav className='flex flex-col gap-4 text-lg'>
            <Link
              href='/'
              className='hover:text-yellow-400 transition'
              onClick={closeSidebar}
            >
              Home
            </Link>
            <Link
              href='/shop'
              className='hover:text-yellow-400 transition'
              onClick={closeSidebar}
            >
              Shop
            </Link>
            <Link
              href='/blog'
              className='hover:text-yellow-400 transition'
              onClick={closeSidebar}
            >
              Blog
            </Link>
            <Link
              href='/about'
              className='hover:text-yellow-400 transition'
              onClick={closeSidebar}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveNav;
