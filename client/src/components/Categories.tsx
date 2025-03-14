import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CarouselImage } from './Carouselmage';
import { CarouselProducts } from './CarouselProducts';

const Categories = () => {
  const categories = [
    'Loitta',
    'Chepa',
    'Churi',
    'Domestic dried fish',
    'Marine dried fish',
    'Delicious dried fish',
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
        <CarouselImage />
        <CarouselProducts />
      </div>
    </section>
  );
};

export default Categories;
