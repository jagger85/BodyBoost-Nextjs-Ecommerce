import Image from 'next/image'
import missionImage from '@/assets/Mission.jpg'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Trophy, Medal, HeartPulse, Handshake } from 'lucide-react'
import React from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

const MissionSection = () => {
  const missions = [
    {
      id: '1',
      icon: <Medal />,
      title: 'Performance-Driven',
      description:
        'We empower your body to go further, faster, and stronger by enhancing every move you make. Your success fuels our mission.',
    },
    {
      id: '2',
      icon: <HeartPulse />,
      title: 'Health First',
      description:
        'Every step we take is grounded in improving your overall well-being. We believe performance starts with a balanced, healthy foundation.',
    },
    {
      id: '3',
      icon: <Trophy />,
      title: 'Quality You Can Trust',
      description:
        'Every product we offer is thoroughly vetted to ensure it aligns with your goals and supports your active lifestyle.',
    },
    {
      id: '4',
      icon: <Handshake />,
      title: 'Inclusivity in Motion',
      description:
        'We celebrate every athlete—regardless of gender, skill level, or sport. Our supplements are crafted to support your unique journey.',
    },
  ]

  return (
    <div className='flex flex-col md:flex-row items-center gap-8 py-16 px-4 md:px-8 max-w-7xl mx-auto'>
      <div className='w-full md:w-1/2'>
        <Image src={missionImage} alt='man running' className='rounded-lg object-cover w-full h-[300px]' style={{transform: 'scaleX(-1)'}} />
      </div>
      <div className='w-full md:w-2/3 space-y-2'>
        <div className='flex flex-col gap-2 items-center'>
          <div className='text-gray-600 font-medium'>Body Boost</div>
          <div className='text-4xl font-bold text-gray-900'>Mission</div>
        </div>
        <Carousel className='w-full mb-12'>
          <CarouselContent>
            {missions.map(mission => (
              <CarouselItem key={mission.id} className='basis-1/2'>
                <div className='space-y-4 text-center px-4'>
                  <Card className='border-none'>
                    <CardHeader className='flex flex-col items-center pt-2'>
                      {React.cloneElement(mission.icon, { className: 'w-8 h-8 text-gray-700' })}
                      <div className='text-base font-semibold text-gray-900'>{mission.title}</div>
                    </CardHeader>
                    <CardContent>
                      <div className='text-gray-600 leading-relaxed max-w-md mx-auto text-sm'>
                        {mission.description}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='left-0' />
          <CarouselNext className='right-0' />
        </Carousel>
      </div>
    </div>
  )
}

export default MissionSection
