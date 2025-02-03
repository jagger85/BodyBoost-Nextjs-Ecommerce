import Image from 'next/image'
import splashImage from '@/assets/Effect.png'
import supplementImage from '@/assets/Supplement.png'
import heroImage from '@/assets/hands-up.jpg'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <div className='wrapper w-full mt-8'>
      <div style={{ position: 'relative' }}>
        <Image
          className='rounded-big'
          src={heroImage}
          alt='people happy'
          layout='responsive'
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
        />
        <div className='text-5xl ml-8' style={{ position: 'absolute', top: '40%', zIndex: 2 }}>
          <span>Sport Nutrition and</span>
          <br />
          <span>Fitness Supplents</span>
          <br />
          <Button>Explore our products</Button>
        </div>
        <div
          style={{
            position: 'absolute',
            top:'23%',
            right:'10%',
            zIndex: 3,
          }}
        >
          <div style={{ position: 'relative' }}>
            <Image
              src={splashImage}
              alt='splash effect'
              style={{
                position: 'absolute',
                zIndex: 1,
                transform: 'scale(2.1)',
              }}
            />
            <Image
              src={supplementImage}
              alt='body boost supplement'
              width={300}
              height={300}
              style={{
                position: 'relative',
                zIndex: 2,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
