'use client';

import { getDataFromDB, manageUserData } from '@/api';
import LoginRedirectPage from '@/components/LoginComponents/LoginRedirectPage';
import { useUser } from '@/ContextProvider/Provider';
import { TUser } from '@/Interface';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const LoginPage = () => {
  const { data: session } = useSession();
  const { user, base_url, setUser, setCart } = useUser();
  const router = useRouter();

  useEffect(() => {
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
          toast.success(message);

          const localUrl = localStorage.getItem('url')!;

          if (localUrl) {
            router.push(`/${localUrl}`);
            localStorage.removeItem('url');
          } else {
            router.push('/profile');
          }

          localStorage.setItem('user', JSON.stringify(userInfo));
          const storedUser = JSON.parse(localStorage.getItem('user')!);
          setUser(storedUser);

          const cartInfo = await getDataFromDB(
            `${base_url}/my-cart/${storedUser?._id}`,
          );
          localStorage.setItem('cart', JSON.stringify(cartInfo.data));
          setCart(cartInfo.data);
        }
      } catch (error) {
        console.error('Error storing user:', error);
      }
    };

    if (session) {
      if (session.user) {
        sendUserToServer(session.user as TUser);
      }
    }
  }, [session, base_url, router, setCart, setUser]);

  return <div className='min-h-screen'>{!user && <LoginRedirectPage />}</div>;
};

export default LoginPage;
