import Image from 'next/image'
import splashImage from '@/assets/Effect.png'
import supplementImage from '@/assets/Supplement.png'
import heroImage from '@/assets/hands-up.jpg'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <div className='wrapper-big w-full mt-8'>
      <div className='flex' style={{ position: 'relative' }}>
        <Image
          className='rounded-big w-full h-auto md:h-[80vh] object-cover lg:object-[center_20%]'
          src={heroImage}
          alt='people happy'
          width={200}
          height={200}
          style={{ opacity: 0.3 }}
        />
        <div
          className='rounded-big absolute inset-0 bg-gradient-to-r from-transparent to-black'
          style={{
            background: 'linear-gradient(to left, rgba(0, 0, 0, 1) 20%, transparent 100%)',
            zIndex: 2,
          }}
        >
          <div className='flex flex-row justify-around items-center h-full'>
            <div className='flex flex-col justify-center w-1/2 ml-6 text-xl md:text-5xl lg:text-6xl'>
                <span className='font-extrabold'>Sport</span> Nutrition and
              <span className='mt-2 '>
                Fitness <span className='font-extrabold'>Supplements</span>
              </span>
              <Button className='mt-6 w-fit text-white font-extrabold button-gradient-1'>
                <span className='p-4 text-md md:text-xl'>Explore Our Products</span>
              </Button>
            </div>
            <div className='relative w-1/2 aspect-[3/4]'>
              <Image
                src={splashImage}
                alt='splash effect'
                fill
                className='object-contain'
                style={{
                  zIndex: 1,
                }}
              />
              <Image
                src={supplementImage}
                alt='body boost supplement'
                fill
                className='object-contain'
                style={{
                  zIndex: 2,
                  scale: 0.5,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
