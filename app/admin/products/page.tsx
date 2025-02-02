import Link from 'next/link'
import { getAllProducts, deleteProduct } from '@/lib/actions/product.actions'
import { formatCurrency, formatId } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from '@/components/shared/pagination'
import DeleteDialog from '@/components/shared/delete-dialog'
import { Product, ProductVariant } from '@/types'

const AdminProductsPage = async (props: {
  searchParams: Promise<{
    page: string
    query: string
    category: string
  }>
}) => {
  const searchParams = await props.searchParams
  const page = Number(searchParams.page) || 1
  const searchText = searchParams.query || ''
  const category = searchParams.category || ''

  const products: { data: Product[]; totalPages: number } = await getAllProducts({
    query: searchText,
    page,
    category,
  })

  return (
    <div className='space-y-2'>
      <div className='flex-between'>
        <div className='flex items-center gap-3'>
          <h1 className='h2-bold'>Products</h1>
          {searchText && (
            <div className='ml-4 pt-1'>
              Filtered by <i>&quot;{searchText}&quot;</i>{' '}
              <Link href='/admin/products'>
                <Button variant='outline' size='sm' className='ml-4'>
                  Remove Filter
                </Button>
              </Link>
            </div>
          )}
        </div>
        <Button asChild variant='default'>
          <Link href='/admin/products/create'>Create Product</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>FLAVOR</TableHead>
            <TableHead>SERVINGS</TableHead>
            <TableHead>STOCK</TableHead>
            <TableHead>PRICE</TableHead>
            <TableHead>CATEGORY</TableHead>
            <TableHead>SUB CATEGORY</TableHead>
            <TableHead>RATING</TableHead>
            <TableHead className='w-[100px]'>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.data.map((product: Product) =>
            product.variants.map((variant: ProductVariant) => (
              <TableRow key={`${product.id}-${variant.id}`}>
                <TableCell>{formatId(product.id)}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{variant.flavor}</TableCell>
                <TableCell>{variant.servings}</TableCell>
                <TableCell>{variant.stock}</TableCell>
                <TableCell>{formatCurrency(variant.price)}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.subCategory}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell className='flex gap-1'>
                  <Button asChild variant='outline' size='sm'>
                    <Link href={`/admin/products/${product.id}`}>Edit</Link>
                  </Button>
                  <DeleteDialog id={product.id} action={deleteProduct} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {products.totalPages > 1 && <Pagination page={page} totalPages={products.totalPages} />}
    </div>
  )
}

export default AdminProductsPage
