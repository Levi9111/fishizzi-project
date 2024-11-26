import Banner from '@/components/Banner';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';

const HomePage = () => {
  return (
    <section className='pt-36'>
      <Categories />
      <Banner />
      <FeaturedProducts />
    </section>
  );
};

export default HomePage;
