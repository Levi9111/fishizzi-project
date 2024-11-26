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

export function CarouselProducts() {
  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true }),
  );
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
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/5'>
            <div className='p-1'>
              <Card>
                <CardContent className='flex aspect-square items-center justify-center p-6 relative'>
                  <span className='text-3xl font-semibold'>{index + 1}</span>

                  <span className='absolute -bottom-2 block w-24 p-1 rounded-xl bg-brand-yellow text-center capitalize text-sm font-semibold'>
                    title
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
