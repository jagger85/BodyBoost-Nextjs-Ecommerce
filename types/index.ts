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

export type ProductVariant = z.infer<typeof productVariantSchema> & {
  id: string
  productId: string
  createdAt: Date
}

export type Product = z.infer<typeof insertProductSchema> & {
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
  product: Product
  productVariant: ProductVariant
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
