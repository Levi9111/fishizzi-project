'use client';
import React, { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

import image2 from '../../public/images/shutki-images/2.jpg';
import image3 from '../../public/images/shutki-images/3.jpg';
import image4 from '../../public/images/shutki-images/4.jpg';
import image5 from '../../public/images/shutki-images/5.jpg';
import image6 from '../../public/images/shutki-images/6.jpg';
import image7 from '../../public/images/shutki-images/7.jpg';
import image8 from '../../public/images/shutki-images/8.jpg';
import image9 from '../../public/images/shutki-images/9.jpg';
import image10 from '../../public/images/shutki-images/10.jpg';
import image11 from '../../public/images/shutki-images/11.jpg';
import image12 from '../../public/images/shutki-images/12.jpeg';

import image13 from '../../public/images/shutki-images/13.jpg';
import image14 from '../../public/images/shutki-images/14.jpeg';
import image15 from '../../public/images/shutki-images/15.jpeg';

interface CarouselProductsProps {
  titles?: string[];
  autoplayDelay?: number;
}

const images = [
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
];
const CarouselProducts: React.FC<CarouselProductsProps> = ({
  titles = [],
  autoplayDelay = 1500,
}) => {
  const plugin = useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        align: 'start',
        loop: true,
      }}
      className='w-full max-w-full'
    >
      <CarouselContent className='py-4'>
        {images.map((img, index) => (
          <CarouselItem
            key={index}
            className='xs:basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 p-2'
          >
            <Card className='overflow-hidden border rounded-xl h-full'>
              <CardContent className='flex items-center justify-center p-0 relative h-full'>
                <div className='w-full aspect-square overflow-hidden'>
                  <Image
                    src={img}
                    alt={titles[index] || `Product ${index + 1}`}
                    width={1200}
                    height={800}
                    className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
                  />
                </div>

                {titles && titles[index] && (
                  <span
                    className='absolute -bottom-2 block w-auto min-w-24 max-w-full px-3 py-1 mx-auto left-0 right-0 
                    text-center rounded-xl bg-primary text-primary-foreground 
                    text-sm font-medium truncate shadow-md'
                  >
                    {titles[index] || `Product ${index + 1}`}
                  </span>
                )}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='hidden sm:block'>
        <CarouselPrevious className='absolute left-0 top-1/2 -translate-y-1/2' />
        <CarouselNext className='absolute right-0 top-1/2 -translate-y-1/2' />
      </div>
    </Carousel>
  );
};

export default CarouselProducts;
