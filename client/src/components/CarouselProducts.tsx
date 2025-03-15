'use client';
import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
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

export function CarouselProducts() {
  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true }),
  );

  const imgArrr = [
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
  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        align: 'start',
      }}
      className='w-full'
    >
      <CarouselContent className='py-3'>
        {imgArrr.map((img, index) => (
          <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/5'>
            <Card className=''>
              <CardContent className='flex !aspect-auto items-center justify-center !p-0 relative '>
                <div className='w-full aspect-square'>
                  <Image
                    src={img}
                    alt='Shutki'
                    width={600}
                    height={200}
                    className='h-[180px] w-full rounded-xl'
                  />
                </div>

                <span className='absolute -bottom-2 block w-24 p-1 rounded-xl bg-brand-yellow text-center capitalize text-sm font-semibold'>
                  title
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
