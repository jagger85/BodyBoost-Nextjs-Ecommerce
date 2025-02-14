import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import ProductPrice from './product-price'
import { Product } from '@/types'
import Rating from './rating'
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className='w-full max-w-sm bg-backgroundLighter border-none rounded-none py-4 px-6'>
      <CardHeader className='p-4 items-center'>
        <div className='mb-6'>
          <Rating value={Number(product.rating)} />
        </div>
        <div className='relative'>
          <div className='w-fit px-4 py-2 bg-black rounded-xl border border-1 border-white font-extrabold text-2xl absolute -right-2 top-10 '>
            $ 59.80
          </div>
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
        </div>
      </CardHeader>
      <CardContent className='p-4 grid gap-0'>
        <div className='text-base text-primary font-extrabold'>{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <div className='text-xl font-extrabold'>
            Serious Mass - Muscle Growth
            <br />
            6LB - Original
          </div>
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
