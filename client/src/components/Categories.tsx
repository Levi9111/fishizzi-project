import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CarouselImage } from './Carouselmage';
import { CarouselProducts } from './CarouselProducts';

const Categories = () => {
  const categories = [
    'category-1',
    'category-2',
    'category-3',
    'category-4',
    'category-5',
    'category-6',
  ];

  return (
    <section className='w-fixedScreen mx-auto grid grid-cols-[350px_1fr] gap-3 pb-12'>
      <div className='space-y-2'>
        {categories.map((category) => (
          <Link
            href={`/products?category=${category}`}
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
