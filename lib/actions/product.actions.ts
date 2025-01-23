'use server'
import { prisma } from '@/db/prisma'
import { convertToPlainObject, formatError } from '../utils'
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from '../constants'
import { revalidatePath } from 'next/cache'
import { insertProductSchema, updateProductSchema } from '../validators'
import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { Product } from '@/types'

// Get latest products
export async function getLatestProducts(): Promise<Product[]> {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
    include: {
      variants: {
        select: {
          id: true,
          productId: true,
          createdAt: true,
          flavor: true,
          servings: true,
          stock: true,
          price: true,
        },
      },
    },
  })

  return convertToPlainObject(data).map(product => ({
    ...product,
    rating: Number(product.rating),
  }))
}

// Get single product by its slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await prisma.product.findFirst({
    where: { slug: slug },
    include: {
      variants: {
        select: {
          id: true,
          productId: true,
          createdAt: true,
          flavor: true,
          servings: true,
          stock: true,
          price: true,
        },
      },
    },
  })
  return data
    ? {
        ...convertToPlainObject(data),
        rating: Number(data.rating),
      }
    : null
}

// Get single product by its id
export async function getProductById(productId: string): Promise<Product | null> {
  const data = await prisma.product.findFirst({
    where: { id: productId },
    include: {
      variants: {
        select: {
          id: true,
          productId: true,
          createdAt: true,
          flavor: true,
          servings: true,
          stock: true,
          price: true,
        },
      },
    },
  })
  return data
    ? {
        ...convertToPlainObject(data),
        rating: Number(data.rating),
      }
    : null
}

// Get all products
export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  price,
  rating,
  sort,
}: {
  query: string
  limit?: number
  page: number
  category?: string
  price?: string
  rating?: string
  sort?: string
}): Promise<{ data: Product[]; totalPages: number }> {
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== 'all'
      ? {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        }
      : {}

  const categoryFilter = category && category !== 'all' ? { category } : {}

  // Price filter - checks variants
  const priceFilter: Prisma.ProductWhereInput =
    price && price !== 'all'
      ? {
          variants: {
            some: {
              price: {
                gte: Number(price.split('-')[0]),
                lte: Number(price.split('-')[1]),
              },
            },
          },
        }
      : {}

  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            gte: Number(rating),
          },
        }
      : {}

  const orderByConfig: Prisma.ProductOrderByWithRelationInput =
    sort === 'lowest' || sort === 'highest'
      ? {
          variants: {
            _count: 'desc',
          },
        }
      : sort === 'rating'
        ? { rating: 'desc' }
        : { createdAt: 'desc' }

  const data = await prisma.product.findMany({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    },
    orderBy: orderByConfig,
    include: {
      variants: {
        select: {
          id: true,
          productId: true,
          createdAt: true,
          flavor: true,
          servings: true,
          stock: true,
          price: true,
        },
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  })

  // If sorting by price, we need to do it in memory since Prisma doesn't support ordering by related field values
  const sortedData = [...data]
  if (sort === 'lowest') {
    sortedData.sort((a, b) => {
      const minPriceA = Math.min(...a.variants.map(v => Number(v.price)))
      const minPriceB = Math.min(...b.variants.map(v => Number(v.price)))
      return minPriceA - minPriceB
    })
  } else if (sort === 'highest') {
    sortedData.sort((a, b) => {
      const maxPriceA = Math.max(...a.variants.map(v => Number(v.price)))
      const maxPriceB = Math.max(...b.variants.map(v => Number(v.price)))
      return maxPriceB - maxPriceA
    })
  }

  const dataCount = await prisma.product.count({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    },
  })

  return {
    data: convertToPlainObject(sortedData).map(product => ({
      ...product,
      rating: Number(product.rating),
    })),
    totalPages: Math.ceil(dataCount / limit),
  }
}

// Delete Product
export async function deleteProduct(id: string) {
  try {
    const productExist = await prisma.product.findFirst({
      where: { id },
      include: { variants: true },
    })
    if (!productExist) throw new Error('Product not found')

    await prisma.product.delete({ where: { id } })
    revalidatePath('/admin/products')
    return {
      success: true,
      message: 'Product deleted successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}

// Create Product
export const createProduct = async (data: z.infer<typeof insertProductSchema>) => {
  try {
    const { variants, ...productData } = data

    const product = await prisma.product.create({
      data: {
        ...productData,
        variants: {
          create: variants,
        },
      },
      include: {
        variants: true,
      },
    })

    revalidatePath('/admin/products')
    return {
      success: true,
      message: 'Product created successfully',
      product: convertToPlainObject(product),
    }
  } catch (error) {
    console.error('Error creating product:', error)
    return {
      success: false,
      message: formatError(error),
    }
  }
}

// Update Product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const { variants, ...productData } = data
    const productExists = await prisma.product.findFirst({
      where: { id: productData.id },
      include: { variants: true },
    })

    if (!productExists) throw new Error('Product not found')

    const product = await prisma.product.update({
      where: { id: productData.id },
      data: {
        ...productData,
        variants: {
          deleteMany: {}, // Delete all existing variants
          create: variants, // Create new variants
        },
      },
      include: {
        variants: true,
      },
    })

    revalidatePath('/admin/products')
    return {
      success: true,
      message: 'Product updated successfully',
      product: convertToPlainObject(product),
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}

// Get all categories
export async function getAllCategories() {
  const data = await prisma.product.groupBy({
    by: ['category'],
    _count: true,
  })
  return data
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  const data = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    take: 4,
    include: {
      variants: {
        select: {
          id: true,
          productId: true,
          createdAt: true,
          flavor: true,
          servings: true,
          stock: true,
          price: true,
        },
      },
    },
  })

  return convertToPlainObject(data).map(product => ({
    ...product,
    rating: Number(product.rating),
  }))
}
