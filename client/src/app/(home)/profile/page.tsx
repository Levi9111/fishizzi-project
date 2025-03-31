'use client';
import AdminContorlPage from '@/components/AdminComponents/AdminContorlPage';
import UserDetailsPage from '@/components/LoginComponents/UserDetailsPage';
import { useUser } from '@/ContextProvider/Provider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LoginDetails = () => {
  const router = useRouter();
  const { admin_email, developer_email, user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  // TODO: Set up a loading component
  if (isLoading) {
    return null;
  } else {
    return user?.email === admin_email || user?.email === developer_email ? (
      <AdminContorlPage />
    ) : (
      <UserDetailsPage />
    );
  }
};

export default LoginDetails;
