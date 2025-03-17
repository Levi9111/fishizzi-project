'use client';
import Image from 'next/image';
import logo from '../../../public/logo/logo.png';

import { Search, ShoppingCart, Truck, User } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useUser } from '@/ContextProvider/Provider';

// TODO: Add HelpCircle functionality later for user support
// import { HelpCircle } from 'lucide-react';
const DesktopNav = () => {
  const { user } = useUser();
  return (
    <div className='nav-md:flex hidden justify-between items-center w-fixedScreen md:max-w-full max-w-[95%] mx-auto py-2'>
      <div className='bg-white h-[60px] flex items-center'>
        <Image src={logo} alt='logo' width={70} height={60} />
      </div>

      <div className=''>
        <ul className='md:flex hidden items-center justify-center gap-5 text-overlay-white font-semibold '>
          <li className='hover:text-brand-accent transition-all after:block after:content-[""] after:border-solid after:border-2 after:border-brand-accent after:scale-x-0 after:origin-left after:duration-200 duration-200 after:ease-in-out hover:after:scale-x-100'>
            <Link href='/'>Home</Link>
          </li>
          <li className='hover:text-brand-accent transition-all after:block after:content-[""] after:border-solid after:border-2 after:border-brand-accent after:scale-x-0 after:origin-left after:duration-200 duration-200 after:ease-in-out hover:after:scale-x-100'>
            <Link href='/shop'>Shop</Link>
          </li>
          <li className='hover:text-brand-accent transition-all after:block after:content-[""] after:border-solid after:border-2 after:border-brand-accent after:scale-x-0 after:origin-left after:duration-200 duration-200 after:ease-in-out hover:after:scale-x-100'>
            <Link href='/blog'>Blog</Link>
          </li>
          <li className='hover:text-brand-accent transition-all after:block after:content-[""] after:border-solid after:border-2 after:border-brand-accent after:scale-x-0 after:origin-left after:duration-200 duration-200 after:ease-in-out hover:after:scale-x-100'>
            <Link href='/blog'>About</Link>
          </li>
        </ul>
      </div>

      {/* searchbar */}
      <div className='xl:w-[400px]'>
        <form
          action=''
          className='flex items-center relative w-full focus:outline-none'
        >
          <Input
            type='text'
            placeholder='Search yout products'
            className='pr-10 border-0 bg-overlay-white'
          />
          <Button
            type='submit'
            className='absolute top-0 right-0 bg-yellow-400 hover:bg-yellow-400 text-white after:absolute after:top-0 after:bottom-0 after:right-0 after:left-0 after:bg-brand-accent after:rounded-md after:translate-y-10 after:hover:translate-y-0 after:transition-all after:duration-200 overflow-hidden'
          >
            <Search className='relative z-10' />
          </Button>
        </form>
      </div>
      <div className='flex items-center justify-between gap-2 text-overlay-white border border-overlay-white rounded-md px-2 py-1 cursor-pointer'>
        <Truck />
        <p className='nav-xl:block hidden'>Select your delivery address</p>
      </div>

      {/* users info */}
      <div className='flex items-center justify-center gap-4 w-[200px] text-overlay-white'>
        <div className='flex items-center justify-between gap-2 text-overlay-white border border-overlay-white rounded-md px-3 py-[2px] cursor-pointer hover:bg-blue-50 hover:bg-opacity-40 transition-all duration-300'>
          <p className='text-xl'>বাংলা</p>
        </div>
        <button>
          <Link href='/login'>
            {user ? (
              <Image
                src={user.image}
                alt={user.name}
                width={40}
                height={40}
                className='rounded-full'
                title={user.name}
              />
            ) : (
              <User />
            )}
          </Link>
        </button>
        {/* <button>
          <HelpCircle />
        </button> */}
        <button className='relative'>
          <Link href='/my-cart'>
            <ShoppingCart />
          </Link>
          <span className='absolute -top-1 left-4 rounded-full h-4 w-4  bg-red-500 flex items-center justify-center text-xs'>
            4
          </span>
        </button>
      </div>
    </div>
  );
};

export default DesktopNav;
