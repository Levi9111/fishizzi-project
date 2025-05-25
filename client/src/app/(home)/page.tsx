import Banner from '@/components/Banner';
import Categories from '@/components/Categories';

const HomePage = () => {
  return (
    <section className='py-8'>
      <Categories />
      <Banner />
      {/* <FeaturedProducts /> */}
    </section>
  );
};

export default HomePage;
