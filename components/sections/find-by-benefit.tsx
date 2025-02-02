'use client'

import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious } from '../ui/carousel'
import BenefitCard from '@/components/benefit-card'
import beautyImage from '@/assets/Benefits-Beauty.webp'
import brainHealthImage from '@/assets/Benefits-BrainHealth.webp'
import energyImage from '@/assets/Benefits-Energy.webp'
import performanceImage from '@/assets/Benefits-Sport.webp'
import Autoplay from 'embla-carousel-autoplay'

const ShopBenefitSection = () => {
  const benefits = [
    {
      id: '1',
      name: 'Beauty',
      image: beautyImage,
      slug: 'benefit-1',
    },
    {
      id: '2',
      name: 'BrainHealth',
      image: brainHealthImage,
      slug: 'benefit-2',
    },
    {
      id: '3',
      name: 'Energy',
      image: energyImage,
      slug: 'benefit-3',
    },
    {
      id: '4',
      name: 'Performance',
      image: performanceImage,
      slug: 'benefit-4',
    },
  ]

  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <div className='text-2xl'>Find By</div>
      <div className='text-4xl font-bold'>BENEFIT</div>
      <div className='pl-10 pr-10'>
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
              Autoplay({
                  delay: 10000,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
              }),
          ]}
          >
          <CarouselContent>
            {benefits.map(benefit => (
              <CarouselItem key={benefit.id} className='basis-1/3'>
                <BenefitCard benefit={benefit} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </div>
    </div>
  )
}

export default ShopBenefitSection
