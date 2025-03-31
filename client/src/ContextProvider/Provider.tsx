'use client';

import { TAddress, TCartItem, TUser } from '@/Interface';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';

interface UserContextType {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  cart: TCartItem | null;
  setCart: (cart: TCartItem | null) => void;
  base_url: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  admin_email: string;
  developer_email: string;
  addresses: TAddress[];
  setAddresses: (addresses: TAddress[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [cart, setCart] = useState<TCartItem | null>(null);
  const [addresses, setAddresses] = useState<TAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const base_url = process.env.NEXT_PUBLIC_BASE_URL!;
  const admin_email = process.env.NEXT_PUBLIC_ADMIN_EMAIL!;
  const developer_email = process.env.NEXT_PUBLIC_DEVELOPER_EMAIL!;

  const memoizedSetCart = useCallback((newCart: TCartItem | null) => {
    setCart(newCart);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedCart = localStorage.getItem('cart');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing storedUser:', e);
      }
    }

    if (storedCart) {
      try {
        if (cart === null) {
          setCart(JSON.parse(storedCart));
        }
      } catch (e) {
        console.error('Error parsing storedCart:', e);
      }
    }
  }, [cart]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        cart,
        setCart: memoizedSetCart,
        loading,
        setLoading,
        base_url,
        admin_email,
        developer_email,
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
