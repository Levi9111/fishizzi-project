'use client';

import { TAddress, TCartItem, TUser } from '@/Interface';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface UserContextType {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  cart: TCartItem | null;
  setCart: (cart: TCartItem | null) => void;
  base_url: string;
  admin_email: string;
  addresses: TAddress[];
  setAddresses: (addresses: TAddress[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [cart, setCart] = useState<TCartItem | null>(null);
  const [addresses, setAddresses] = useState<TAddress[]>([]);
  const base_url = process.env.NEXT_PUBLIC_BASE_URL!;
  const admin_email = process.env.NEXT_PUBLIC_ADMIN_EMAIL!;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedCart = localStorage.getItem('cart');

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedCart && cart === null) setCart(JSON.parse(storedCart));
  }, [cart]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        cart,
        setCart,
        base_url,
        admin_email,
        addresses,
        setAddresses,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier usage
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
