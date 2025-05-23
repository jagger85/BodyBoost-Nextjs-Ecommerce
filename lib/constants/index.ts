export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Kween Store'
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Modern ecomerce store for kween'
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 5

export const signInDefaultValues = {
  email: '',
  password: '',
}
export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const shippingAddressDefaultValues = {
  fullName: '',
  streetAddress: '',
  city: '',
  postalCode: '',
  country: '',
}

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(', ')
  : ['PayPal', 'Stripe', 'CashOnDelivery']

export const DEFAULT_PAYMENT_MEHTOD = process.env.DEFAULT_PAYMENT_MEHTOD || 'PayPal'

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 2

export const productDefaultValues = {
  name: '',
  slug: '',
  category: '',
  subCategory: '',
  description: '',
  brand: '',
  what: '',
  when: '',
  why: '',
  images: [],
  isFeatured: false,
  banner: null,
  variants: [
    {
      flavor: '',
      servings: 0,
      stock: 0,
      price: 0,
    },
  ],
}

export const USER_ROLES = process.env.USER_ROLES ? process.env.USER_ROLES.split(', ') : ['admin', 'user']

export const reviewFormDefaultValues = {
  title: '',
  comment: '',
  rating: 0,
}

export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev'

export const productCategories = [
  {
    'Muscle Growth': [
      'Pre-workout',
      'Post-workout',
      'Whey protein',
      'Casein protein',
      'Plant-based protein',
      'Creatine',
      'BCAAs',
      'Glutamine',
    ],
  },
  { 'Weight Loss': ['Fat burners', 'Appetite suppressants', 'Thermogenics'] },
  { Endurance: ['Electrolytes', 'Hydration powders', 'Energy boosters'] },
  { 'Food and Nutrition': ['Food supplements', 'Food bars', 'Food powders', 'Joint support', 'Bone strength'] },
  { 'Health and Wellness': ['Sleep aids', 'Digestive health', 'Immunity boosters', 'Herbal supplements'] },
]
