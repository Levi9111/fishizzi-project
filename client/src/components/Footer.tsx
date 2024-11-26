import Image from 'next/image';
import logo from '../../public/logo/logo.png';
import Link from 'next/link';
import { Facebook, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className='bg-brand-primary'>
      <div className='w-fixedScreen mx-auto grid grid-cols-[350px_1fr_1fr] gap-10 py-10 text-overlay-white'>
        <div className='flex items-start justify-start  flex-col'>
          <div className='bg-white w-16 h-16 mb-4'>
            <Image
              src={logo}
              alt='logo'
              width={120}
              height={120}
              className='w-full h-full'
            />
          </div>
          <p className='text-md'>
            Fishizzy is an online shop offering a wid range of dried freshwater
            and saltwater fish.
          </p>

          <p className='mt-4'>
            Contact:{' '}
            <span className='opacity-70 underline hover:text-brand-accent hover:opacity-60 transition-all duration-150'>
              <Link href=''>000 111 222</Link>
            </span>
          </p>
        </div>

        <div className='px-6'>
          <h3 className='font-semibold text-2xl mb-3'>Company</h3>
          <div className='flex items-start justify-start gap-32'>
            <ul className='text-md space-y-2'>
              <li>
                <Link href=''>About Us</Link>
              </li>
              <li>
                <Link href=''>Return Policy</Link>
              </li>
              <li>
                <Link href=''>Refund Policy</Link>
              </li>
            </ul>

            <ul className='text-md space-y-2'>
              <li>
                <Link href=''>Privacy Policy</Link>
              </li>
              <li>
                <Link href=''>Delivery Policy</Link>
              </li>
              <li>
                <Link href=''>Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* newsletter */}
        <form action='' className='px-6'>
          <h3 className='font-semibold text-2xl mb-3'>
            Subscribe to our newsletter
          </h3>
          <div className='relative border border-white rounded-md'>
            <Input
              type='email'
              placeholder='Enter your email'
              className='placeholder:text-overlay-white focus:outline-none focus:border-white border-0 pr-16'
            />
            <Button
              type='submit'
              className='absolute top-0 right-0 bg-brand-yellow hover:bg-brand-yellow text-white after:absolute after:top-0 after:bottom-0 after:right-0 after:left-0 after:bg-brand-accent after:rounded-md after:translate-y-10 after:hover:translate-y-0 after:transition-all after:duration-300 overflow-hidden'
            >
              <Send className='relative z-10 ' />
            </Button>
          </div>
        </form>
      </div>

      {/* secondary footer */}
      <div className='border-t-2 border-gray-400 '>
        <div className='w-fixedScreen mx-auto py-6 flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3'>
            <p className='text-overlay-white text-md'>Follow Us on: </p>
            <Link
              href=''
              className='border-[3px] border-overlay-white flex items-center justify-center rounded-full w-8 h-8 p-1 hover:bg-brand-secondary'
            >
              <Facebook className='text-overlay-white ' />
            </Link>
          </div>

          <p className='text-overlay-white text-md'>
            &copy; {new Date().getFullYear()} <span className=''>Fishizzy</span>
            . All right reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
