import { Benefit } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

const BenefitCard = ({ benefit }: { benefit: Benefit }) => {
  return (
    <div>
      <Link href={`/benefit/${benefit.slug}`}>
        <Image
          src={benefit.image}
          alt={benefit.name}
          height={300}
          width={500}
          priority={true}
          style={{ objectFit: 'contain' }}
          className='w-full'
        />
        <div className='flex items-center justify-center w-full mt-4'>{benefit.name}</div>
      </Link>
    </div>
  )
}

export default BenefitCard
