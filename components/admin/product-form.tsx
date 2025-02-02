'use client'
import { useToast } from '@/hooks/use-toast'
import { productCategories, productDefaultValues } from '@/lib/constants'
import { insertProductSchema, updateProductSchema } from '@/lib/validators'
import { formatNumberWithDecimal } from '@/lib/utils'
import { Product } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import slugify from 'slugify'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox'
import { createProduct, updateProduct } from '@/lib/actions/product.actions'
import { UploadButton } from '@/lib/uploadthing'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'


const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update'
  product?: Product
  productId?: string
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const defaultValues = {
    ...productDefaultValues,
    variants: [
      {
        flavor: '',
        servings: 0,
        stock: 0,
        price: '0.00',
      },
    ],
  }

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: type === 'Update' ? zodResolver(updateProductSchema) : zodResolver(insertProductSchema),
    defaultValues: product && type === 'Update' ? product : defaultValues,
  })

  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async values => {
    //On create
    if (type === 'Create') {
      const res = await createProduct(values)
      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        })
      } else {
        toast({
          description: res.message,
        })
        router.push('/admin/products')
      }
    }
    //On update
    if (type === 'Update') {
      if (!productId) {
        router.push('/admin/products')
        return
      }
      const res = await updateProduct({ ...values, id: productId })
      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        })
      } else {
        toast({
          description: res.message,
        })
        router.push('/admin/products')
      }
    }
  }

  const images = form.watch('images')
  const isFeatured = form.watch('isFeatured')
  const banner = form.watch('banner')

  return (
    <Form {...form}>
      <form method='POST' onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='flex flex-col md:flex-row gap-5'>
          {/**Name */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'name'> }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/**Slug */}
          <FormField
            control={form.control}
            name='slug'
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'slug'> }) => (
              <FormItem className='w-full'>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input placeholder='Enter slug' {...field} />
                    <Button
                      type='button'
                      className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2'
                      onClick={() => form.setValue('slug', slugify(form.getValues('name'), { lower: true }))}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col md:flex-row gap-5'>
          {/**Category */}
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {productCategories.map(cat => {
                      const category = Object.keys(cat)[0]
                      return (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/**SubCategory */}
          <FormField
            control={form.control}
            name='subCategory'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Sub Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} disabled={!form.watch('category')}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a subcategory' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {form.watch('category') &&
                      (() => {
                        const categoryObj = productCategories.find(
                          (cat) => Object.keys(cat)[0] === form.watch('category')
                        )
                        const subCategories = categoryObj ? Object.values(categoryObj)[0] : []
                        return subCategories.map((subCat: string) => (
                          <SelectItem key={subCat} value={subCat}>
                            {subCat}
                          </SelectItem>
                        ))
                      })()}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/**Brand */}
          <FormField
            control={form.control}
            name='brand'
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'brand'> }) => (
              <FormItem className='w-full'>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product brand' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='upload-field flex flex-col md:flex-row gap-5'>
          {/**Images */}
          <FormField
            control={form.control}
            name='images'
            render={() => (
              <FormItem className='w-full'>
                <FormLabel>Images</FormLabel>
                <Card>
                  <CardContent className='space-y-2 mt-2 min-h-48'>
                    <div className='flex-start space-x-2'>
                      {images.map((image: string) => (
                        <Image
                          key={image}
                          src={image}
                          alt='product image'
                          className='w-20 h-20 object-cover object-center rounded-sm'
                          width={100}
                          height={100}
                        />
                      ))}
                      <FormControl>
                        <UploadButton
                          endpoint='imageUploader'
                          onClientUploadComplete={(res: { url: string }[]) => {
                            form.setValue('images', [...images, res[0].url])
                          }}
                          onUploadError={(error: Error) => {
                            toast({
                              variant: 'destructive',
                              description: `Error! ${error}`,
                            })
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='upload-field'>
          {/** isFeatured */}
          Featured Product
          <Card>
            <CardContent className='space-y-2 mt-2'>
              <FormField
                control={form.control}
                name='isFeatured'
                render={({ field }) => (
                  <FormItem className='space-x-2 items-center'>
                    <FormControl />
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    <FormControl>
                      <FormLabel>Is Featured?</FormLabel>
                    </FormControl>
                  </FormItem>
                )}
              />
              {isFeatured && banner && (
                <Image
                  src={banner}
                  alt='banner image'
                  className='w-full object-cover object-center rounded-sm'
                  width={1920}
                  height={680}
                />
              )}

              {isFeatured && !banner && (
                <UploadButton
                  endpoint='imageUploader'
                  onClientUploadComplete={(res: { url: string }[]) => {
                    form.setValue('banner', res[0].url)
                  }}
                  onUploadError={(error: Error) => {
                    toast({
                      variant: 'destructive',
                      description: `Error! ${error}`,
                    })
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          {/** Description */}
          <FormField
            control={form.control}
            name='description'
            render={({
              field,
            }: {
              field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'description'>
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder='Enter product description' {...field} className='resize-none' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-medium'>Product Variants</h3>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={() => {
                const currentVariants = form.getValues('variants')
                form.setValue('variants', [...currentVariants, { flavor: '', servings: 0, stock: 0, price: '0.00' }])
              }}
            >
              Add Variant
            </Button>
          </div>

          {form.watch('variants').map((_, index) => (
            <Card key={index}>
              <CardContent className='pt-6'>
                <div className='flex justify-between items-center mb-4'>
                  <h4 className='font-medium'>Variant {index + 1}</h4>
                  {index > 0 && (
                    <Button
                      type='button'
                      variant='destructive'
                      size='sm'
                      onClick={() => {
                        const currentVariants = form.getValues('variants')
                        form.setValue(
                          'variants',
                          currentVariants.filter((_, i) => i !== index)
                        )
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name={`variants.${index}.flavor`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Flavor</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter flavor' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`variants.${index}.servings`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Servings</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Enter servings'
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`variants.${index}.stock`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Enter stock'
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`variants.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            step='0.01'
                            placeholder='Enter price'
                            {...field}
                            onChange={e => field.onChange(formatNumberWithDecimal(parseFloat(e.target.value)))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          {/** Submit */}
          <Button type='submit' size='lg' disabled={form.formState.isSubmitting} className='button col-span-2 w-full'>
            {form.formState.isSubmitting ? 'Submitting' : `${type} Product`}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProductForm
