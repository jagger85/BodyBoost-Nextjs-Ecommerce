import Image from 'next/image'
import missionImage from '@/assets/Mission.jpg'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Trophy, Medal, HeartPulse, Handshake } from 'lucide-react'
import React from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

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
    <section className='wrapper relative overflow-hidden py-20 px-4 md:px-8' aria-label='Body Boost Mission'>
      <div className='container mx-auto flex flex-col md:flex-row md:gap-12 md:justify-between items-center'>
        <div className='absolute z-1 right-0 opacity-5 transition-opacity duration-1000'>
          <Image
            src='/images/logo-white.png'
            alt='Background brand logo'
            width={800}
            height={800}
            priority={false}
            className='opacity-50'
          />
        </div>
        <div className='w-full md:w-1/2 mb-10 md:mb-0 transition-transform duration-500 hover:scale-[1.02]'>
          <div className='relative aspect-[4/3] w-full z-2'>
            <Image
              src={missionImage}
              alt='Athlete in motion representing our mission'
              className='rounded-xl object-cover shadow-lg opacity-60'
              style={{ transform: 'scaleX(-1)' }}
              fill
              sizes='(max-width: 768px) 100vw, 50vw'
              priority
              placeholder='blur'
              blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0cHBwcHy4lJyctLzkyMi8nLy0wO0BCPzhLPS0yRWFFS1NWW1xfOUNXY2NfXGFbW1v/2wBDARUXFxwcHBwcHBwbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
            />
          </div>
        </div>

        <div className='flex flex-col justify-center items-center w-full md:w-2/5 space-y-8'>
          <div className='text-center space-y-4'>
            <h2 className='text-white text-5xl tracking-wider font-redzone'>Body Boost</h2>
            <p className='text-3xl text-white/90 font-light'>Mission</p>
          </div>

          <div className='relative w-full max-w-xl mx-auto'>
            <Carousel
              opts={{
                loop: true,
                align: 'center',
              }}
              className='w-full max-w-xl relative mx-auto'
            >
              <div className='mx-12'>
                <CarouselContent>
                  {missions.map(mission => (
                    <CarouselItem key={mission.id}>
                      <Card
                        className={cn(
                          'border pattern-grid-semitransparent backdrop-blur-sm',
                          'transition-all duration-300 hover:border-primary/50 group'
                        )}
                      >
                        <CardHeader className='flex flex-col items-center space-y-4 pb-4'>
                          <div className='p-3 rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110'>
                            {React.cloneElement(mission.icon, {
                              className: 'w-8 h-8 text-primary',
                              'aria-hidden': 'true',
                            })}
                          </div>
                          <h3 className='text-xl font-bold text-white'>{mission.title}</h3>
                        </CardHeader>
                        <CardContent>
                          <p className='text-white/90 leading-relaxed text-center'>{mission.description}</p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </div>
              <div className='hidden md:block'>
                <CarouselPrevious className='absolute left-1 top-1/2 -translate-y-1/2' />
                <CarouselNext className='absolute right-1 top-1/2 -translate-y-1/2' />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MissionSection
