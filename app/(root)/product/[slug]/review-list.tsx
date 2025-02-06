'use client'
import { Review } from '@/types'
import Link from 'next/link'
import { useState } from 'react'
import ReviewForm from './review-form'
import { getReviews } from '@/lib/actions/review.actions'
import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, User } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import Rating from '@/components/shared/product/rating'

const ReviewList = ({ userId, productId, productSlug }: { userId: string; productId: string; productSlug: string }) => {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    const loadReviews = async () => {
      const res = await getReviews({ productId })
      setReviews(res.data)
    }
    loadReviews()
  }, [productId])
  const reload = async () => {
    // Reload reviews after created or updated
    const res = await getReviews({ productId })
    setReviews([...res.data])
  }

  return (
    <div className='mb-4 grid grid-cols-1  md:grid-cols-4'>
      <div className='flex flex-col gap-4'>
        <h2 className='h2-bold'>Customer Reviews</h2>
        {reviews.length === 0 && <div>No reviews yet</div>}
        {userId ? (
          <>
            <ReviewForm userId={userId} productId={productId} onReviewSubmitted={reload} />
          </>
        ) : (
          <>
            <div>
              Please{' '}
              <Link className='text-primary px-2' href={`/sign-in?callbackUrl=/product/${productSlug}`}>
                Sign In
              </Link>
              to write a review
            </div>
          </>
        )}
      </div>
      <div className='col-span-3 m-0 flex flex-col gap-4'>
          {reviews.map(review => (
            <Card key={review.id} className='bg-transparent border-none'>
              <CardHeader>
                <div className='flex-between'>
                  <CardTitle>{review.title}</CardTitle>
                </div>
                <CardDescription>{review.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex space-x-4 text-sm text-muted-foregroud'>
                  <Rating value={review.rating} />
                  <div className='flex items-center'>
                    <User className='mr-1 h-3 w-3' />
                    {review.user ? review.user.name : 'User'}
                  </div>
                  <div className='flex items-center'>
                    <Calendar className='mr-1 h-3 w-3' />
                    {formatDateTime(review.createdAt).dateTime}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    
  )
}

export default ReviewList
