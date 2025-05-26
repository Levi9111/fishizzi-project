'use client';
import { getDataFromDB } from '@/api';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar/Navbar';
import { useUser } from '@/ContextProvider/Provider';
import { TCartItemInCart } from '@/Interface';
import { useEffect } from 'react';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setTotalItemsInCart, base_url, user, loading, setLoading } =
    useUser();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getDataFromDB(`${base_url}/my-cart/${user?._id}`);
      console.log(result);

      if (result.success) {
        const totalQuantity = result.data.itemsInCart.reduce(
          (acc: number, item: TCartItemInCart) => acc + item.quantity,
          0,
        );

        setTotalItemsInCart(totalQuantity);
        setLoading(false);
      }
    };
    fetchData();
    setLoading(false);
  }, [base_url, user, setTotalItemsInCart, setLoading]);

  if (loading) return <Loader />;

  return (
    <main>
      <Navbar />
      <div className='pt-32'>{children}</div>
      <Footer />
    </main>
  );
}
