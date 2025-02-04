import Link from 'next/link'
import { productCategories } from '@/lib/constants'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Search = async () => {
  return (
    <form action='/search' method='GET'>
      <div className='flex with-full max-w-sm items-center space-x-2'>
        <DropdownMenu>
          <DropdownMenuTrigger>Shop</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className='text-xl text-primary'>CATEGORIES</DropdownMenuLabel>
            {productCategories.map(category => {
              const categoryName = Object.keys(category)[0]
              return (
                <DropdownMenuItem key={categoryName}>
                  <Link href={`/search?category=${categoryName}`} className='font-extrabold'>
                    {categoryName.toUpperCase()}
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </form>
  )
}

export default Search
