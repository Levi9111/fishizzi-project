import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import CarouselProducts from './CarouselProducts';
import CarouselImages from './Carouselmage';

const Categories = () => {
  const categories = [
    'Domestic dried fish',
    'Marine dried fish',
    'Delicious dried fish',
    'Premium Dry Fish',
    'Raw fish',
    'Balachao',
    'Fish Chips',
    'Recipe Book',
    'Combo package',
    'Dry Fish Gift Box',
  ];

  return (
    <section className='md:max-w-full max-w-[95%] w-fixedScreen mx-auto md:grid grid-cols-[350px_1fr] gap-3 pb-12'>
      <div className='md:space-y-2 md:block hidden'>
        {categories.map((category) => (
          <Link
            href={`/products?category=${category.toLocaleLowerCase()}`}
            className='capitalize flex items-center justify-between text-gray-800 '
            key={category}
          >
            <p>{category}</p>
            <ChevronRight />
          </Link>
        ))}
      </div>
      <div className=''>
        <CarouselImages />

        {/* TODO: Manage the responsive layout this component  later*/}
        <div className='hidden sm:block'>
          <CarouselProducts />
        </div>
      </div>
    </section>
  );
};

export default Categories;
