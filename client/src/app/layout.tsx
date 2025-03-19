import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Provider } from '@/ContextProvider/Provider';
import { Toaster } from '@/components/ui/sonner';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Fishizzy',
  description: `
    Fishizzy is an online platform that delivers premium quality dried fish, known as Shutki, directly to customers' doors in Bangladesh. We offer a diverse selection of dried freshwater and saltwater fish, sourced to maintain their authentic flavor and nutritional value. Enjoy the traditional taste of Bangladeshi Shutki with the convenience of online shopping at Fishizzy.
  `,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' cz-shortcut-listen='true'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-200 `}
      >
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
