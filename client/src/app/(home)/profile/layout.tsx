'use client';
import MyAccountSidebar from '@/components/LoginComponents/MyAccountSidebar';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <div className='flex md:flex-row flex-col-reverse md:min-h-screen text-gray-700 bg-gray-300'>
        <div className='md:w-[400px] md:min-h-screen  pl-3 pb-3'>
          <MyAccountSidebar />
        </div>
        <div className='w-full   pb-3 px-3'>{children}</div>
      </div>
    </SessionProvider>
  );
}
