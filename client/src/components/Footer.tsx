import Image from 'next/image';
import logo from '../../public/logo/logo.png';
import Link from 'next/link';
import { Facebook, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className='bg-brand-primary'>
      <div className='md:max-w-full max-w-[95%] w-fixedScreen mx-auto md:grid md:grid-cols-[350px_1fr_1fr] md:gap-10 md:py-10 text-overlay-white md:my-0 my-3 flex flex-col gap-4'>
        <div className='flex items-start justify-start  flex-col'>
          <Image src={logo} alt='logo' width={120} height={120} />
          <p className='text-md'>
            Fishizzy is an online shop offering a wid range of dried freshwater
            and saltwater fish.
          </p>

          <p className='md:mt-4'>
            Contact:{' '}
            <span className='opacity-70 underline hover:text-brand-accent hover:opacity-60 transition-all duration-150'>
              <Link href=''>01329766940</Link>
            </span>
          </p>
        </div>

        <div className='md:px-6'>
          <h3 className='font-semibold text-2xl mb-3'>Company</h3>
          <div className='flex md:flex-row flex-col items-start justify-start md:gap-32 gap-2'>
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
        <form action='' className='md:px-6'>
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
        <div className='md:max-w-full max-w-[95%] w-fixedScreen mx-auto py-6 flex sm:flex-row flex-col items-center justify-between'>
          <div className='flex items-center justify-start gap-3'>
            <p className='text-overlay-white text-md'>Follow Us on: </p>
            <a
              target='blank'
              href='https://www.facebook.com/share/17SY7AX8H7/'
              className='border-[3px] border-overlay-white flex items-center justify-center rounded-full w-8 h-8 p-1 hover:bg-brand-secondary'
            >
              <Facebook className='text-overlay-white ' />
            </a>
          </div>

          <p className='text-overlay-white text-md text-center'>
            &copy; {new Date().getFullYear()} <span className=''>Fishizzy</span>
            . All right reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
