import Image from 'next/image'
import splashImage from '@/assets/Effect.png'
import supplementImage from '@/assets/Supplement.png'
import heroImage from '@/assets/hands-up.jpg'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <div className='wrapper w-full mt-8'>
      <div className='flex' style={{ position: 'relative' }}>
        <Image
          className='rounded-big w-full h-auto'
          src={heroImage}
          alt='people happy'
          width={200}
          height={200}
          style={{ opacity: 0.2 }}
        />
        <div
          className='rounded-big absolute inset-0 bg-gradient-to-r from-transparent to-black'
          style={{
            background: 'linear-gradient(to left, rgba(0, 0, 0, 1) 20%, transparent 100%)',
            zIndex: 2,
          }}
        >
          <div className='grid grid-cols-5 h-full p-6'>
            <div className='col-span-3 flex flex-col justify-center'>
              <span className='text-xl md:text-5xl'>
                <span className='font-extrabold'>Sport</span> Nutrition and
              </span>
              <span className='mt-2 text-xl md:text-5xl'>
                Fitness <span className='font-extrabold'>Supplements</span>
              </span>
              <Button className='mt-6 w-fit text-white font-extrabold button-gradient-1'>
                <span className='p-4 text-sm md:text-xl'>Explore Our Products</span>
              </Button>
            </div>
            <div
              className='col-span-2'
              style={{
                position: 'relative',
                display: 'flex',
              }}
            >
              <Image
                src={splashImage}
                alt='splash effect'
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  scale: 1.4,
                  height: '70%',
                  top: '15%',
                }}
              />
              <Image
                src={supplementImage}
                alt='body boost supplement'
                style={{
                  zIndex: 2,
                  position: 'absolute',
                  width: '60%',
                  top: '25%',
                  left: '20%',
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
