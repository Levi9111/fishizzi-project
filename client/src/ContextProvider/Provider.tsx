'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface TUser {
  id?: string;
  name: string;
  email: string;
  image: string;
  provider: string;
}

interface UserContextType {
  user: TUser | null;
  setUser: (user: TUser) => void;
  base_url: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const base_url = process.env.NEXT_PUBLIC_BASE_URL!;
  return (
    <UserContext.Provider value={{ user, setUser, base_url }}>
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
