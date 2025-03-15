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
      <div className='flex min-h-screen text-gray-700 bg-gray-300'>
        <div className='md:w-[400px] min-h-screen pt-32 pl-3 pb-3'>
          <MyAccountSidebar />
        </div>
        <div className='w-full pt-32 pb-3 px-3'>{children}</div>
      </div>
    </SessionProvider>
  );
}
