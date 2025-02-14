'use client'

import { ProductVariant } from '@/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'

interface VariantSelectorProps {
  variants: ProductVariant[]
  selectedVariantId: string
}

export default function VariantSelector({ variants, selectedVariantId }: VariantSelectorProps) {
  const router = useRouter()

  return (
    <div className='mt-4'>
      <label htmlFor='variant-select' className='block text-xl font-bold mb-2'>
        Select Flavor
      </label>
      <Select
        defaultValue={selectedVariantId}
        onValueChange={value => {
          router.push(`?variant=${value}`, { scroll: false })
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder='Select a flavor' />
        </SelectTrigger>
        <SelectContent>
          {variants.map(variant => (
            <SelectItem key={variant.id} value={variant.id}>
              {variant.flavor} - {variant.servings} servings
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
