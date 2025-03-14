'use client';

import { TUser } from '@/Interface';
import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  base_url: string;
  admin_email: string;
  globalMessage: string;
  setGlobalMessage: (message: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [globalMessage, setGlobalMessage] = useState('');
  const base_url = process.env.NEXT_PUBLIC_BASE_URL!;
  const admin_email = process.env.NEXT_PUBLIC_ADMIN_EMAIL!;

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        base_url,
        admin_email,
        globalMessage,
        setGlobalMessage,
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
