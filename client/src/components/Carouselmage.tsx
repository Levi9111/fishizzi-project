'use client';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import banner1 from '../../public/images/banner-image/banner-img-1.jpeg';
import banner2 from '../../public/images/banner-image/banner-img-2.jpeg';
import banner3 from '../../public/images/banner-image/banner-img-3.png';
import banner4 from '../../public/images/banner-image/banner-img-4.jpeg';
import banner5 from '../../public/images/banner-image/banner-img-5.jpeg';
import banner6 from '../../public/images/banner-image/banner-img-6.jpeg';
import Image from 'next/image';
import { useRef } from 'react';

const images = [banner1, banner2, banner3, banner4, banner5, banner6];

const CarouselImages = ({ titles = [], autoplayDelay = 1500 }) => {
  const plugin = useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true }),
  );

  return (
    <div className='w-full'>
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: 'start',
          loop: true,
        }}
        className='w-full'
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <Card className='border-0 rounded-none overflow-hidden'>
                <CardContent className='flex items-center justify-center p-0'>
                  <div className='w-full aspect-[21/9] sm:aspect-[21/7] md:aspect-[21/6] overflow-hidden'>
                    <Image
                      src={img}
                      alt={titles[index] || `Banner ${index + 1}`}
                      width={1700}
                      height={1200}
                      className='w-full h-full '
                    />
                  </div>
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
    </div>
  );
};

export default CarouselImages;
