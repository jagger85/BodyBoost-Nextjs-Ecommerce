import ProductCard from '@/components/shared/product/product-card'
import { getAllProducts, getAllCategories } from '@/lib/actions/product.actions'
import Link from 'next/link'

const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
]

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string
    category?: string
    price?: string
    rating?: string
    sort?: string
    page?: string
  }>
}) => {
  const {
    q = 'all',
    price = 'all',
    rating = 'all',
    category = 'all',
    sort = 'newest',
    page = '1',
  } = await props.searchParams

  // Construct filter url
  const getFilterUrl = ({ c, p, s, r, pg }: { c?: string; p?: string; s?: string; r?: string; pg?: string }) => {
    const params = { q, category, price, rating, sort, page }
    if (c) params.category = c
    if (p) params.price = p
    if (s) params.sort = s
    if (r) params.rating = r
    if (pg) params.page = pg

    return `/search?${new URLSearchParams(params).toString()}`
  }

  const products = await getAllProducts({
    query: q,
    price,
    rating,
    category,
    sort,
    page: Number(page),
  })

  const categories = await getAllCategories()

  return (
    <div className='grid md:grid-cols-5 md:gap-5'>
      <div className='filter-links'>
        {/** Category Links */}
        <div className='text-xl mb-2 mt-3'>Department</div>
        <div>
          <ul className='space-y-1'>
            <li>
              <Link
                className={`${(category === 'all' || category === '') && 'font-bold'}`}
                href={getFilterUrl({ c: 'all' })}
              >
                Any
              </Link>
            </li>
            {categories.map(x => (
              <li key={x.category}>
                <Link className={`${category === x.category && 'font-bold'}`} href={getFilterUrl({ c: x.category })}>
                  {x.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/** Price Links */}
        <div className='text-xl mb-2 mt-8'>Price</div>
        <div>
          <ul className='space-y-1'>
            <li>
              <Link className={`${price === 'all' && 'font-bold'}`} href={getFilterUrl({ p: 'all' })}>
                Any
              </Link>
            </li>
            {prices.map(p => (
              <li key={p.value}>
                <Link className={`${price === p.value && 'font-bold'}`} href={getFilterUrl({ p: p.value })}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='md:col-span-4 space-y-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {products.data.length === 0 && <div>No products found</div>}
          {products.data.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
