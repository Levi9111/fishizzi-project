'use client';
import { useUser } from '@/ContextProvider/Provider';
import { useRouter } from 'next/navigation';
import { Fragment, ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user } = useUser();
  if (user === null) {
    router.push('/login');
    return null;
  }
  return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
