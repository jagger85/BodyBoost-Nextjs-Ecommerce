import { getProductBySlug } from '@/lib/actions/product.actions'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import ProductPrice from '@/components/shared/product/product-price'
import ProductImages from '@/components/shared/product/product-images'
import AddToCart from '@/components/shared/product/add-to-cart'
import { getMyCart } from '@/lib/actions/cart.actions'
import ReviewList from './review-list'
import { auth } from '@/auth'
import Rating from '@/components/shared/product/rating'
import VariantSelector from '@/components/shared/product/variant-selector'

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ variant?: string }>
}) => {
  const { slug } = await props.params
  const { variant: variantId } = await props.searchParams

  const product = await getProductBySlug(slug)
  if (!product) notFound()

  // Find the selected variant or use the first one as default
  const selectedVariant = variantId ? product.variants.find(v => v.id === variantId) : product.variants[0]

  if (!selectedVariant) notFound()

  const session = await auth()
  const userId = session?.user?.id

  const cart = await getMyCart()

  return (
    <>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-5'>
          {/**Images column */}
          <div className='col-span-2'>
            <ProductImages images={product.images} />
          </div>
          {/** Details column */}
          <div className='col-span-2 p-5'>
            <div className='flex flex-col gap-6'>
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className='h3-bold'>{product.name}</h1>
              <Rating value={Number(product.rating)} />
              <p>{product.numReviews} reviews</p>

              <div className='flex flex-col gap-4'>
                <VariantSelector variants={product.variants} selectedVariantId={selectedVariant.id} />

                <ProductPrice
                  value={Number(selectedVariant.price)}
                  className='w-24 rounded-full bg-green-100 text-green-700 px-5 py-2'
                />
              </div>
            </div>
            <div className='mt-10'>
              <p className='font-semibold'>Description</p>
              <p>{product.description}</p>
            </div>
          </div>
          {/** Action column */}
          <Card>
            <CardContent className='p-4'>
              <div className='mb-2 flex justify-between'>
                <div>Price</div>
                <div>
                  <ProductPrice value={Number(selectedVariant.price)} />
                </div>
              </div>
              <div className='mb-2 flex justify-between'>
                <div>Status</div>
                {selectedVariant.stock > 0 ? (
                  <Badge variant='outline'>In stock</Badge>
                ) : (
                  <Badge variant='destructive'>Out of stock</Badge>
                )}
              </div>
              {selectedVariant.stock > 0 && (
                <div className='flex-center'>
                  <AddToCart
                    cart={cart}
                    item={{
                      productId: product.id,
                      variantId: selectedVariant.id,
                      name: product.name,
                      slug: product.slug,
                      price: selectedVariant.price,
                      qty: 1,
                      image: product.images[0],
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      <section className='mt-10'>
        <h2 className='h2-bold'>Customer Reviews</h2>
        <ReviewList userId={userId || ''} productId={product.id} productSlug={product.slug} />
      </section>
    </>
  )
}

export default ProductDetailsPage
