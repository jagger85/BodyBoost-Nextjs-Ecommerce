import ProductCard from './product-card'
import { Product } from '@/types'
const ProductList = ({ data, title, limit }: { data: Product[]; title?: string; limit?: number }) => {
  const limitedData = limit ? data.slice(0, limit) : data
  return (
    <div className='wrapper-big my-10  mt-20'>
      <div className='flex flex-col items-center mb-8'>
        <h2 className='text-5xl tracking-wider mb-2 text-center'>{title}</h2>
        <p className='text-muted-foreground mt-2 text-sm uppercase tracking-widest'>
          Upgrade Your Routine with What&apos;s New
        </p>
      </div>

      {data.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
          {limitedData.map((product: Product) => (
            <div className='flex justify-center items-center' key={product.slug}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No products found</p>
        </div>
      )}
    </div>
  )
}

export default ProductList
