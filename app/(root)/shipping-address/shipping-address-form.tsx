'use client'

import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useTransition } from 'react'
import { shippingAddressSchema } from '@/lib/validators'
import { ShippingAddress } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { z } from 'zod'
import { shippingAddressDefaultValues } from '@/lib/constants'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = userRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = () =>{
    return
  }

  return (
    <>
      <div className='max-w-md mx-auto space-y-4'>
        <h1 className='h2-bold mt-4'>Shipping Address</h1>
        <p className='text-sm text-muted-foreground'>Please enter and address to ship to</p>
        <Form {...form}>
          <form method='post' className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col md:flex-row gap-5'>
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>,'fullName'>}) => (
                  <FormItem className='w-full'>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter full name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col md:flex-row gap-5'>
              <FormField
                control={form.control}
                name='streetAddress'
                render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>,'streetAddress'>}) => (
                  <FormItem className='w-full'>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}

export default ShippingAddressForm
