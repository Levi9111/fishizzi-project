'use client';

import { useUser } from '@/ContextProvider/Provider';
import Communicate from '../Communicate';
import DesktopNav from './DesktopNav';
import ResponsiveNav from './ResponsiveNav';
const Navbar = () => {
  const { cart, user } = useUser();
  const totalItemsInCart =
    cart?.itemsInCart.reduce((accu, item) => accu + item.quantity, 0) || 0;

  return (
    <nav className='bg-brand-primary fixed left-0 right-0 z-20'>
      <DesktopNav user={user} totalItemsInCart={totalItemsInCart} />
      {/* Responsive nav */}
      <ResponsiveNav user={user} totalItemsInCart={totalItemsInCart} />
      <Communicate />
    </nav>
  );
};

export default Navbar;
