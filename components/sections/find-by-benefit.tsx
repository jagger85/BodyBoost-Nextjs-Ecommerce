'use client'
import Image from 'next/image'
import enduranceImage from '@/assets/endurance.png'
import wellnessImage from '@/assets/wellness.png'
import muscleGrowthImage from '@/assets/muscle-growth.jpg'
import weigthLossImage from '@/assets/weigth-loss.png'
import foodImage from '@/assets/food.png'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { productCategories } from '@/lib/constants'
const baseUrl = '/search?category='

// Define benefit data structure
const benefits = [
  {
    title: 'Muscle Growth',
    image: muscleGrowthImage,
    alt: 'man lifting weigth',
    className: 'rounded-t-big rounded-bl-big',
    isFullHeight: true,
    buttonWidth: 'w-3/4',
    url: `${baseUrl}${Object.keys(productCategories[0])[0]}`,
  },
  {
    title: 'Weight Loss',
    image: weigthLossImage,
    alt: 'a woman in the gym',
    className: 'rounded-t-big rounded-br-big',
    isFullHeight: true,
    buttonWidth: 'w-3/4',
    url: `${baseUrl}${Object.keys(productCategories[1])[0]}`,
  },
  {
    title: 'Wellness',
    image: wellnessImage,
    alt: 'a woman meditating',
    className: 'rounded-t-big rounded-br-big',
    isFullHeight: true,
    buttonWidth: 'w-3/4',
    url: `${baseUrl}${Object.keys(productCategories[2])[0]}`,
  },
  {
    title: 'Endurance',
    image: enduranceImage,
    alt: 'people cicling',
    className: 'rounded-t-big rounded-bl-big',
    isFullHeight: false,
    buttonWidth: 'w-2/4',
    url: `${baseUrl}${Object.keys(productCategories[3])[0]}`,
  },
  {
    title: 'Food',
    image: foodImage,
    alt: 'shopping bag',
    className: 'rounded-b-big rounded-tr-big',
    isFullHeight: false,
    buttonWidth: 'w-2/4',
    url: `${baseUrl}${Object.keys(productCategories[4])[0]}`,
  },
]

// Benefit Card Component
const BenefitCard = ({ benefit, router }: { benefit: (typeof benefits)[0]; router: AppRouterInstance }) => (
  <div className={`relative flex justify-center items-center ${benefit.isFullHeight ? 'row-span-2' : ''}`}>
    <Button
      onClick={() => router.push(benefit.url)}
      className={`absolute button-gradient-2 z-10 text-w font-extrabold ${benefit.buttonWidth}`}
    >
      {benefit.title}
    </Button>
    <Image
      src={benefit.image}
      alt={benefit.alt}
      className={`${benefit.className} opacity-80`}
      fill={!benefit.isFullHeight}
    />
  </div>
)

const ShopBenefitSection = () => {
  const router = useRouter()
  return (
    <div className='wrapper-big flex flex-col w-full items-center justify-center mt-20'>
      <div className='flex flex-col items-center mb-8'>
        <div className='relative'>
          <div className='text-3xl md:text-5xl  tracking-wider'>FIND BY BENEFIT</div>
        </div>
        <p className='text-muted-foreground mt-2 text-sm uppercase tracking-widest'>Fuel Your Goals</p>
      </div>
      <div className='w-full'>
        <div className='grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4'>
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} router={router} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopBenefitSection
