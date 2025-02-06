'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Static target date (replace with desired date)
const TARGET_DATE = new Date('2025-03-22T00:00:00')

// Common section layout component
const Section = ({ children }: { children: React.ReactNode }) => (
  <section className='wrapper grid grid-cols-1 md:grid-cols-2 my-20'>{children}</section>
)

// Common image component
const PromotionImage = () => (
  <div className='flex justify-center'>
    <Image src='/images/Supplement.png' alt='promotion' width={300} height={200} />
  </div>
)

// Function to calculate the time remaining
const calculateTimeRemaining = (targetDate: Date) => {
  const currentTime = new Date()
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0)

  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  }
}

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className='p-4 w-full text-center'>
    <p className='text-3xl font-bold'>{value}</p>
    <p>{label}</p>
  </li>
)

const ActionButton = () => (
  <div className='text-center'>
    <Button asChild className='text-md font-bold w-40'>
      <Link href='/search'>Buy Now</Link>
    </Button>
  </div>
)

const DealCountdown = () => {
  const [time, setTime] = useState<ReturnType<typeof calculateTimeRemaining>>()

  useEffect(() => {
    const updateTimer = () => {
      const newTime = calculateTimeRemaining(TARGET_DATE)
      setTime(newTime)
      return newTime
    }

    // Calculate initial time on client
    updateTimer()

    const timerInterval = setInterval(() => {
      const newTime = updateTimer()
      if (Object.values(newTime).every(value => value === 0)) {
        clearInterval(timerInterval)
      }
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [])

  if (!time) {
    return (
      <Section>
        <div className='flex flex-col gap-2 justify-center'>
          <h3 className='text-3xl font-bold'>Loading Countdown...</h3>
        </div>
      </Section>
    )
  }

  const isExpired = Object.values(time).every(value => value === 0)

  if (isExpired) {
    return (
      <Section>
        <div className='flex flex-col gap-2 justify-center'>
          <h3 className='text-3xl font-bold'>Deal Has Ended</h3>
          <p>This deal is no longer available. Check out our latest promotions!</p>
          <ActionButton />
        </div>
        <PromotionImage />
      </Section>
    )
  }

  const timeUnits = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <Section>
      <div className='flex flex-col gap-2 justify-center'>
        <h3 className='text-3xl font-bold'>Deal Of The Month</h3>
        <p>
          Get ready for a shopping experience like never before with our Deals of the Month! Every purchase comes with
          exclusive perks and offers, making this month a celebration of savvy choices and amazing deals. Don&apos;t
          miss out! 🎁🛒
        </p>
        <ul className='grid grid-cols-4'>
          {timeUnits.map(unit => (
            <StatBox key={unit.label} {...unit} />
          ))}
        </ul>
        <ActionButton />
      </div>
      <PromotionImage />
    </Section>
  )
}

export default DealCountdown
