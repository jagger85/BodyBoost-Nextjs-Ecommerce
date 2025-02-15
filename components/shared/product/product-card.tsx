import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'

const getLowestPrice = (variants: Product['variants']) => {
  if (!variants || variants.length === 0) return 0
  return Math.min(...variants.map(variant => Number(variant.price)))
}

const ProductCard = ({ product }: { product: Product }) => {
  const lowestPrice = getLowestPrice(product.variants)

  return (
    <Card className='w-full h-full max-w-sm bg-backgroundLighter border-none rounded-none py-4 px-6'>
      <CardHeader className='p-4 items-center relative mb-4'>
        <div className='absolute top-0 right-0 z-10'>

        <div className='mb-2 w-full flex flex-col items-end'>
          <div className='w-fit px-4 py-0.2 bg-primary text-black rounded-sm font-black tracking-wider text-xl -mb-1  '>
           ONLY FROM
          </div>
          <div className='w-fit px-4 py-2 bg-black rounded-xl border border-1 border-white font-extrabold text-2xl'>
            $ {lowestPrice.toFixed(2)}
          </div>
        </div>
        </div>
      </CardHeader>
      <CardContent className='p-4 grid gap-0'>
          
      <Link href={`/product/${product.slug}`}>
            <div className='w-5/6 mx-auto'>
              <Image
                src={product.images[0]}
                alt={product.name}
                height={250}
                width={250}
                priority={true}
                className='w-full h-auto'
              />
            </div>
          </Link>
      
        <div className='text-base text-primary font-extrabold'>{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <div className='text-xl font-extrabold'>{product.name}</div>
          {/* <div className='text-md font-extrabold'>{product.name}</div> */}
        </Link>
        {/* <div className='flex-between gap-4 mt-4'>

          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className='text-destructive'>Out Of Stock</p>
          )}
        </div> */}
      </CardContent>
    </Card>
  )
}

export default ProductCard
