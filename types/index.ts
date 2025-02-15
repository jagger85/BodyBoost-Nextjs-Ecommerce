import { z } from 'zod'
import {
  insertProductSchema,
  productVariantSchema,
  insertCartSchema,
  cartItemSchema,
  shippingAddressSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  paymentResultSchema,
  insertReviewSchema,
} from '@/lib/validators'
import { StaticImageData } from 'next/image'

export type ProductVariant = z.infer<typeof productVariantSchema>

// Base product type without variants
type BaseProduct = Omit<z.infer<typeof insertProductSchema>, 'variants'>

export type Product = BaseProduct & {
  id: string
  rating: number
  numReviews: number
  createdAt: Date
  variants: ProductVariant[]
}

export type CategoryType = { [key: string]: string[] }

export type Cart = z.infer<typeof insertCartSchema>
export type CartItem = z.infer<typeof cartItemSchema>
export type ShippingAddress = z.infer<typeof shippingAddressSchema>
export type OrderItem = z.infer<typeof insertOrderItemSchema> & {
  orderId: string
  productId: string
  variantId: string
  name: string
  slug: string
  qty: number
  image: string
  price: string
}

export type Order = z.infer<typeof insertOrderSchema> & {
  id: string
  createdAt: Date
  isPaid: boolean
  paidAt: Date | null
  isDelivered: boolean
  deliveredAt: Date | null
  orderitems: OrderItem[]
  user: { name: string; email: string | null }
  paymentResult: PaymentResult
}

export type PaymentResult = z.infer<typeof paymentResultSchema>
export type Review = z.infer<typeof insertReviewSchema> & {
  id: string
  createdAt: Date
  user?: { name: string }
}

export type Benefit = {
  id: string
  name: string
  image: StaticImageData
  slug: string
}
