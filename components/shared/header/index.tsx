import Image from 'next/image'
import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'
import Menu from './menu'
import Search from './search'

const Header = () => {
  return (
    <header className='w-full border-b bg-black'>
      <div className='wrapper flex-between p-5'>
        <div className='flex-start'>
          <Link href='/' className='hidden md:flex-start ml-4'>
            <Image 
            src='/images/header-logo.png'
            alt={`${APP_NAME} logo`}
            width={280} 
            height={48} 
            priority={true} 
            />
          </Link>
          <Link href='/' className='md:hidden flex-start ml-4'>
            <Image 
            src='/images/logo.png'
            alt={`${APP_NAME} logo`}
            width={48} 
            height={48} 
            priority={true} 
            />
          </Link>
        </div>
        <div className='flex gap-6 font-extrabold text-xs md:text-sm lg:text-2xl'>
          <Search />
          <Link href='/'>Blog</Link>
          <Link href='/'>About Us</Link>
          <Link href='#footer'>Contact</Link>
        </div>
        <Menu />
      </div>
    </header>
  )
}

export default Header
