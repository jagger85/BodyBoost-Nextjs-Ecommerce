import React from 'react'
import { cn } from '@/lib/utils'
const ChekoutSteps = ({ current = 0 }) => {
  return (
    <div className='wrapper flex-between flex-col md:flex-row space-x2 space-y-2 mb-10 mt-10'>
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={cn('p-2 w-56 rounded-full text-center text-sm', index === current ? 'bg-primary text-black' : '')}
          >
            {step}
          </div>
          {step != 'Place Order' && (
            <hr className='w-16 border-t border-gray-300 mx-2' />
          )

          }
        </React.Fragment>
      ))}
    </div>
  )
}

export default ChekoutSteps
