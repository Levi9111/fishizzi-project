import Image from 'next/image';
import chepa from '../../public/images/chepa-package.png';
import reasonable from '../../public/images/reasonable-package.webp';
import Link from 'next/link';
import { Heart } from 'lucide-react';

const products = [
  {
    title: 'Chepa twin package',
    price: '400',
    img: chepa,
  },
  {
    title: 'Reasonable package',
    price: '420',
    img: reasonable,
  },
  {
    title: 'Chepa twin package',
    price: '400',
    img: chepa,
  },
  {
    title: 'Reasonable package',
    price: '420',
    img: reasonable,
  },
];

const FeaturedProducts = () => {
  return (
    <div className='md:max-w-full max-w-[95%] w-fixedScreen mx-auto pb-10'>
      <div className='flex flex-col items-center justify-center rounded-md shadow-close mt-14 mb-4 max-w-96 w-full py-6 mx-auto'>
        <h3 className='text-center text-3xl  uppercase'>Products</h3>
        <p className='text-center text-xl uppercase '>
          Find your preferred shutki
        </p>
      </div>

      <div className='grid md:grid-cols-4 gap-6 border-t-2 pt-6'>
        {products.map((product, i) => (
          <div
            className='group hover:shadow-spread shadow-close transition-all duration-300 relative'
            key={i + product.price}
          >
            <Image
              src={product.img}
              alt={product.title}
              width={250}
              height={250}
              className='w-full'
            />
            <div
              className='w-full bg-gray-900 flex items-center justify-center bg-opacity-90 py-2 absolute  
             transition-all duration-300 group-hover:-translate-y-8 z-10'
            >
              <Link
                href=''
                className='text-overlay-white uppercase font-semibold text-xs'
              >
                View Product
              </Link>
            </div>
            <div className='p-4 relative z-10 bg-white'>
              <div className=''>
                <p className='text-sm'>{product.title}</p>
                <p className='text-xl font-semibold'>&#2547; {product.price}</p>
              </div>
            </div>
            <div className='border-2 border-gray-300 text-gray-300 rounded-full w-min p-1.5 absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer '>
              <Heart />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
