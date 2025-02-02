'use client'
import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <div className='p-6 pt-10 flex flex-col items-center justify-center w-full bg-black border-b-2 border-t-2'>
          <Image src={'/images/logo-3.png'} width={200} height={48} alt={`${APP_NAME} logo`} priority={true} />
          <div className='p-6 w-2/3 rounded-lg text-center'>
            <h1 className='text-3xl font-bold mb-4'> Page Not Found</h1>
            <p className='text-destructive'>The page you are looking for does not exist.</p>
            <Button variant='outline' className='mt-4 ml-2' onClick={() => (window.location.href = '/')}>
              Go back to home
            </Button>
          </div>
        </div>
      </div>
  )
}

export default NotFound
