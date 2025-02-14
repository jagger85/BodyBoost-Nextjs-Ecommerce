import { Button } from '@/components/ui/button'
import { getOrderById } from '@/lib/actions/order.actions'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import Stripe from 'stripe'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { APP_NAME } from '@/lib/constants'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const SuccessPage = async (props: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ payment_intent: string }>
}) => {
  const { id } = await props.params
  const { payment_intent: paymentIntentId } = await props.searchParams

  // Fetch order
  const order = await getOrderById(id)
  if (!order) notFound()

  // Retrieve payment intent
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

  // Check if payment intent is valid
  if (paymentIntent.metadata.orderId == null || paymentIntent.metadata.orderId !== order.id.toString()) {
    return notFound()
  }
  const isSuccess = paymentIntent.status === 'succeeded'
  if (!isSuccess) return redirect(`/order/${id}`)

  return (
    <div className='wrapper flex items-center justify-center align-middle mt-8 h-full'>
      <Card className='pattern-grid w-fit p-10'>
        <CardHeader className='space-y-4 items-center'>
          <Image src='/images/logo-3.png' width={200} height={100} alt={`${APP_NAME} logo`} priority={true} />
          <CardTitle className='text-center text-primary'>Thanks for your purchase</CardTitle>
          <CardDescription className='text-center'>We are processing your order</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center items-center'>
          <Button asChild className='w-fit'>
            <Link href={`/order/${id}`}>View Order</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default SuccessPage
