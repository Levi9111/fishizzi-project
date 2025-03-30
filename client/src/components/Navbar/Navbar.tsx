'use client';

import { useUser } from '@/ContextProvider/Provider';
import Communicate from '../Communicate';
import DesktopNav from './DesktopNav';
import ResponsiveNav from './ResponsiveNav';
import { useEffect, useState } from 'react';
import { handlers } from '@/utils/handlers';
const Navbar = () => {
  const { user } = useUser();
  const [totalItemsInCart, setTotalItemsInCart] = useState(0);

  // TODO: create a function that stores totalItemsInCart in localStorage and then retrieve it

  // const totalItemsInCart = cart?.itemsInCart?.reduce((accu, item) => accu + item.quantity, 0) || 0;

  useEffect(() => {
    if (window !== undefined) {
      handlers.manageTotalItemsInCartFromLocalStorage();
      setTotalItemsInCart(
        JSON.parse(localStorage.getItem('totalItemsInCart')!),
      );
    }
  }, []);

  return (
    <nav className=' fixed left-0 right-0 z-20'>
      <DesktopNav user={user} totalItemsInCart={totalItemsInCart} />
      {/* Responsive nav */}
      <ResponsiveNav user={user} totalItemsInCart={totalItemsInCart} />
      <Communicate />
    </nav>
  );
};

export default Navbar;
