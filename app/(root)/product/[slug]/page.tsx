import { getProductBySlug } from '@/lib/actions/product.actions'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import ProductPrice from '@/components/shared/product/product-price'
import ProductImages from '@/components/shared/product/product-images'
import AddToCart from '@/components/shared/product/add-to-cart'
import { getMyCart } from '@/lib/actions/cart.actions'
import ReviewList from './review-list'
import { auth } from '@/auth'
import Rating from '@/components/shared/product/rating'
import VariantSelector from '@/components/shared/product/variant-selector'
import { Accordion, AccordionTrigger, AccordionContent, AccordionItem } from '@/components/ui/accordion'
import Trio from '@/components/shared/product/trio'
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
      <section className='wrapper mt-4 rounded-lg'>
        <div className='grid grid-cols-1 md:grid-cols-5'>
          {/**Images column */}
          <div className='col-span-2 p-4'>
            <ProductImages images={product.images} />
          </div>
          {/** Details column */}
          <div className='col-span-3 p-10 pattern-grid rounded-lg'>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between w-full'>
                {selectedVariant.stock > 0 ? (
                  <Badge className='text-xl border-gray-600' variant='default'>
                    <span className='text-black'>In Stock</span>
                  </Badge>
                ) : (
                  <Badge variant='destructive'>Out of stock</Badge>
                )}
                <div className='flex gap-2 align-middle bg-black p-2 border border-white rounded-lg'>
                  <Rating value={Number(product.rating)} />
                  <p>{product.numReviews} reviews</p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='text-primary text-2xl font-extrabold'>{product.brand}</div>
                <div className='text-4xl font-extrabold'>{product.name}</div>
                <div>{product.category}</div>
              </div>
              <ProductPrice
                value={Number(selectedVariant.price)}
                className='w-fit p-2 rounded-md  text-white font-extrabold px-5 border-2 border-white'
              />

              <div className='flex flex-col gap-4'>
                <VariantSelector variants={product.variants} selectedVariantId={selectedVariant.id} />
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
            </div>
            <div className='mt-10'>
              <Trio /> 
            </div>
          </div>
        </div>
      </section>
      <section className='wrapper flex flex-col mt-6'>
        <Accordion type='single' collapsible defaultValue='item-description'>
          <AccordionItem value='item-description'>
            <AccordionTrigger className='text-3xl'>Description</AccordionTrigger>
            <AccordionContent className='text-xl'>{product.description}</AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-ingredients'>
            <AccordionTrigger className='text-3xl'>Ingredients</AccordionTrigger>
            <AccordionContent className='text-xl font-thin'>{product.description}</AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-how-to-use'>
            <AccordionTrigger className='text-3xl'>How To Use</AccordionTrigger>
            <AccordionContent className='text-xl'>{product.description}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <section className='wrapper mt-10 flex flex-col gap-2'>
        <ReviewList userId={userId || ''} productId={product.id} productSlug={product.slug} />
      </section>
    </>
  )
}

export default ProductDetailsPage
