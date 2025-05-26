import { useState } from 'react';
import {
  AlignLeft,
  ShoppingCart,
  User,
  X,
  Home,
  Package,
  BookOpen,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Mock user context - replace with your actual context
const useUser = () => ({
  user: null, // or your user object
  totalItemsInCart: 3, // mock cart count
});

const MobileNav = () => {
  const { user, totalItemsInCart } = useUser();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const closeSidebar = () => setIsOpen(false);
  const toggleSearch = () => setShowSearch(!showSearch);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/shop', label: 'Shop', icon: Package },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/about', label: 'About', icon: Info },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <div className='flex items-center justify-between p-4 bg-gray-900 text-white relative md:hidden'>
        {/* Left - Menu Button */}
        <Button
          variant='ghost'
          size='sm'
          onClick={() => setIsOpen(true)}
          className='text-white hover:bg-gray-700 p-2'
        >
          <AlignLeft className='w-6 h-6' />
        </Button>

        {/* Center - Logo/Brand */}
        <Link href='/' className='flex-1 flex justify-center'>
          <div className='text-xl font-bold text-yellow-400'>Fishizzi</div>
        </Link>

        {/* Right - Action Buttons */}
        <div className='flex items-center gap-2'>
          {/* <Button
            variant='ghost'
            size='sm'
            onClick={toggleSearch}
            className='text-white hover:bg-gray-700 p-2'
          >
            <Search className='w-5 h-5' />
          </Button> */}

          <Link href='/cart'>
            <Button
              variant='ghost'
              size='sm'
              className='text-white hover:bg-gray-700 p-2 relative'
            >
              <ShoppingCart className='w-5 h-5' />
              {totalItemsInCart > 0 && (
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold'>
                  {totalItemsInCart}
                </span>
              )}
            </Button>
          </Link>

          <Link href={user ? '/profile' : '/login'}>
            <Button
              variant='ghost'
              size='sm'
              className='text-white hover:bg-gray-700 p-2'
            >
              {user ? (
                <div className='w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-semibold text-sm'>
                  {user.name?.charAt(0) || 'U'}
                </div>
              ) : (
                <User className='w-5 h-5' />
              )}
            </Button>
          </Link>
        </div>
      </div>
      {/* Search Bar (Expandable) */}
      {/* {showSearch && (
        <div className='bg-gray-800 p-4 md:hidden animate-fade-in'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search products...'
              className='w-full bg-gray-700 text-white rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-yellow-400 focus:outline-none'
              autoFocus
            />
            <Button
              type='submit'
              className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-2 rounded-md'
            >
              <Search className='w-4 h-4' />
            </Button>
          </div>
        </div>
      )} */}
      {/* Sidebar Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300 z-50 md:hidden',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible',
        )}
        onClick={closeSidebar}
      >
        {/* Sidebar */}
        <div
          className={cn(
            'w-72 h-full bg-gray-800 text-white flex flex-col shadow-2xl transition-transform duration-300',
            isOpen ? 'translate-x-0' : '-translate-x-full',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className='flex items-center justify-between p-6 border-b border-gray-700'>
            <h2 className='text-xl font-bold text-yellow-400'>Navigation</h2>
            <Button
              variant='ghost'
              size='sm'
              onClick={closeSidebar}
              className='text-white hover:bg-gray-700 p-2'
            >
              <X className='w-5 h-5' />
            </Button>
          </div>

          {/* User Section */}
          {user ? (
            <div className='p-6 border-b border-gray-700'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-semibold'>
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className='font-medium'>{user.name}</p>
                  <p className='text-gray-400 text-sm'>Welcome back!</p>
                </div>
              </div>
            </div>
          ) : (
            <div className='p-6 border-b border-gray-700'>
              <Link
                href='/login'
                onClick={closeSidebar}
                className='flex items-center gap-3 text-yellow-400 hover:text-yellow-300 transition-colors'
              >
                <User className='w-5 h-5' />
                <span>Sign In</span>
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          <nav className='flex-1 p-6'>
            <div className='space-y-2'>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    isActive(item.href)
                      ? 'bg-yellow-400 text-gray-900'
                      : 'text-white hover:bg-gray-700',
                  )}
                >
                  <item.icon className='w-5 h-5' />
                  <span className='font-medium'>{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className='p-6 border-t border-gray-700'>
            <p className='text-gray-400 text-sm text-center'>
              © {new Date().getFullYear()} Fishizzi
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
