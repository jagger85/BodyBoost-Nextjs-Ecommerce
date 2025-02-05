'use client'
import Image from 'next/image'
import enduranceImage from '@/assets/Endurance.png'
import wellnessImage from '@/assets/wellness.png'
import muscleGrowthImage from '@/assets/muscle-growth.jpg'
import weigthLossImage from '@/assets/weigth-loss.png'
import foodImage from '@/assets/food.png'
import { Button } from '../ui/button'

// Define benefit data structure
const benefits = [
  {
    title: 'Muscle Growth',
    image: muscleGrowthImage,
    alt: 'man lifting weigth',
    className: 'rounded-t-big rounded-bl-big',
    isFullHeight: true,
    buttonWidth: 'w-3/4',
  },
  {
    title: 'Weight Loss',
    image: weigthLossImage,
    alt: 'a woman in the gym',
    className: 'rounded-t-big rounded-br-big',
    isFullHeight: true,
    buttonWidth: 'w-3/4',
  },
  {
    title: 'Wellness',
    image: wellnessImage,
    alt: 'a woman meditating',
    className: 'rounded-t-big rounded-br-big',
    isFullHeight: true,
    buttonWidth: 'w-3/4',
  },
  {
    title: 'Endurance',
    image: enduranceImage,
    alt: 'people cicling',
    className: 'rounded-t-big rounded-bl-big',
    isFullHeight: false,
    buttonWidth: 'w-2/4',
  },
  {
    title: 'Food',
    image: foodImage,
    alt: 'shopping bag',
    className: 'rounded-b-big rounded-tr-big',
    isFullHeight: false,
    buttonWidth: 'w-2/4',
  },
]

// Benefit Card Component
const BenefitCard = ({ benefit }: { benefit: (typeof benefits)[0] }) => (
  <div className={`relative flex justify-center items-center ${benefit.isFullHeight ? 'row-span-2' : ''}`}>
    <Button className={`absolute button-gradient-2 z-10 text-w font-extrabold ${benefit.buttonWidth}`}>
      {benefit.title}
    </Button>
    <Image
      src={benefit.image}
      alt={benefit.alt}
      className={`${benefit.className} opacity-60`}
      fill={!benefit.isFullHeight}
    />
  </div>
)

const ShopBenefitSection = () => {
  return (
    <div className='wrapper flex flex-col w-full items-center justify-center mt-6'>
      <div className='text-2xl'>Find By</div>
      <div className='text-4xl font-bold mb-4'>BENEFIT</div>
      <div className='w-full'>
        <div className='grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4'>
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopBenefitSection
