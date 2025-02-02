import { Button } from '../ui/button'
import { getLatestProducts } from '@/lib/actions/product.actions'
import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious } from '../ui/carousel'
import ProductCard from '../shared/product/product-card'

const ShopOurFavouitesSection = async () => {
  const latestProducts = await getLatestProducts()

  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <div className='text-2xl'>Shop Our</div>
      <div className='text-4xl font-bold mb-10'>FAVORITES</div>
      <div className='pl-10 pr-10'>

        <Carousel
          opts={{
              align: 'start',
            }}
            className='w-full mb-12'
            >
          <CarouselContent>
            {
                latestProducts.map((product) => (
                    <CarouselItem key={product.id} className='basis-1/3'>
                        <ProductCard product={product}/>
                    </CarouselItem>
                ))
            }
          </CarouselContent>
          <CarouselNext/>
          <CarouselPrevious/>
        </Carousel>
            </div>


      <Button>Shop All</Button>
    </div>
  )
}

export default ShopOurFavouitesSection
