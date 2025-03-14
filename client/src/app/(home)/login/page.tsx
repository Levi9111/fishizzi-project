'use client';

import { manageUserData } from '@/api';
import LoginRedirectPage from '@/components/LoginComponents/LoginRedirectPage';
import { useUser } from '@/ContextProvider/Provider';
import { TUser } from '@/Interface';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { data: session } = useSession();
  const { setGlobalMessage, user, setUser, base_url } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      if (session.user) {
        sendUserToServer(session.user as TUser);
      }
    }
  }, [session]);

  const sendUserToServer = async (user: TUser) => {
    const { name, email, image, provider } = user;

    const url = `${base_url}/users/create-user`;
    const userData = {
      user: {
        name: name,
        email: email,
        image: image,
        provider,
      },
    };

    try {
      const data = await manageUserData(url, userData);
      const { success, message, data: userInfo } = data;
      if (success) {
        setUser(userInfo);
        setGlobalMessage(message);
        router.push('/login/details');
      }
    } catch (error) {
      console.error('Error storing user:', error);
    }
  };

  return <div className='min-h-screen'>{!user && <LoginRedirectPage />}</div>;
};

export default LoginPage;
