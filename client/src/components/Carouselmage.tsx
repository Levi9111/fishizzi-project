'use client';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import banner1 from '../../public/images/banner-image/banner-img-1.png';
import banner2 from '../../public/images/banner-image/banner-img-2.png';
import banner3 from '../../public/images/banner-image/banner-img-3.png';
import Image from 'next/image';

const imgData = [banner1, banner2, banner3];
export function CarouselImage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className=''>
        {imgData.map((img, index) => (
          <CarouselItem key={index}>
            <Card className='border-0'>
              <CardContent className='flex items-center justify-center p-0'>
                <span className='text-4xl font-semibold'>
                  <Image
                    src={img}
                    alt='Banner img'
                    width={1200}
                    height={200}
                    className='w-full h-full'
                  />
                </span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
