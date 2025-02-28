'use client';
import Image from 'next/image';
import logo from '../../public/logo/logo.png';
import {
  AlignLeft,
  HelpCircle,
  Search,
  ShoppingCart,
  Truck,
  User,
  X,
} from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Link from 'next/link';
import Communicate from './Communicate';
import { useState } from 'react';
import { cn } from '@/lib/utils';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className='bg-brand-primary fixed left-0 right-0 z-20'>
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
        <div className='mav-xl:w-[400px]'>
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
            <User />
          </button>
          <button>
            <HelpCircle />
          </button>
          <button className='relative'>
            <ShoppingCart />
            <span className='absolute -top-1 left-4 rounded-full h-4 w-4  bg-red-500 flex items-center justify-center text-xs'>
              4
            </span>
          </button>
        </div>
      </div>

      {/* Responsive nav */}
      <div className='nav-md:hidden grid grid-cols-[70px_1fr] gap-2 p-2 relative '>
        <div className='flex items-center justify-center'>
          <Image src={logo} alt='logo' width={70} height={60} />
        </div>

        <div className=''>
          <div className='w-full flex items-center justify-between mb-2'>
            <button onClick={() => setIsOpen(true)}>
              <AlignLeft className='text-white' />
            </button>
            <div className='flex items-center justify-center gap-3 text-overlay-white'>
              <button className='relative'>
                <ShoppingCart />
                <span className='absolute -top-1 left-4 rounded-full h-4 w-4  bg-red-500 flex items-center justify-center text-xs'>
                  4
                </span>
              </button>

              <span className='block w-[2px] h-4 rounded-xl bg-overlay-white'></span>

              <button>
                <User />
              </button>
            </div>
          </div>
          {/* searchbar for mobile view*/}
          <div className='w-full '>
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
        </div>

        {/* sidebar */}
        <div
          className={cn(
            'bg-black bg-opacity-30 w-full h-screen absolute top-0 left-0 z-50 shadow-spread transition-all duration-300 ease-out',
            isOpen ? '' : '-translate-x-[1000px]',
          )}
        >
          <ul className='relative flex flex-col gap-3 bg-white sm:w-1/3 w-1/2 h-screen'>
            <li className='absolute top-2 right-2'>
              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </li>
            <li className='hover:text-brand-accent transition-all after:block after:content-[""] after:border-solid after:border-2 after:border-brand-accent after:scale-x-0 after:origin-left after:duration-200 duration-200 after:ease-in-out hover:after:scale-x-100 mt-3'>
              <Link href='/' className='ml-3 '>
                Home
              </Link>
            </li>
            <li className='hover:text-brand-accent transition-all after:block after:content-[""] after:border-solid after:border-2 after:border-brand-accent after:scale-x-0 after:origin-left after:duration-200 duration-200 after:ease-in-out hover:after:scale-x-100'>
              <Link href='/shop' className='ml-3'>
                Shop
              </Link>
            </li>
            <li className='hover:text-brand-accent transition-all after:block after:content-[""] after:border-solid after:border-2 after:border-brand-accent after:scale-x-0 after:origin-left after:duration-200 duration-200 after:ease-in-out hover:after:scale-x-100'>
              <Link href='/blog' className='ml-3'>
                Blog
              </Link>
            </li>
            <li className='hover:text-brand-accent transition-all after:block after:content-[""] after:border-solid after:border-2 after:border-brand-accent after:scale-x-0 after:origin-left after:duration-200 duration-200 after:ease-in-out hover:after:scale-x-100'>
              <Link href='/blog' className='ml-3'>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Communicate />
    </nav>
  );
};

export default Navbar;
