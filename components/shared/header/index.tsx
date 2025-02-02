import Image from 'next/image'
import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'
import Menu from './menu'
import CategoryDrawer from './category-draw'
import Search from './search'

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          <CategoryDrawer />
          <Link href='/' className='flex-start ml-4'>
            <Image src='/images/header-logo.png' alt={`${APP_NAME} logo`} width={200} height={48} priority={true} />
          </Link>
        </div>
        <div className='hidden md:block'>
          <Search />
        </div>
        <Menu />
      </div>
    </header>
  )
}

export default Header
