import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar/Navbar';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      <div className='pt-32'>{children}</div>
      <Footer />
    </main>
  );
}
