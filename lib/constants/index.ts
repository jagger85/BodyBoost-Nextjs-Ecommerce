export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Kween Store'
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Modern ecomerce store for kween'
export const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000'
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4

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
  { 'Performance Enhancers': ['Pre-workout', 'Post-workout', 'Energy boosters'] },
  { 'Protein Supplements': ['Whey protein', 'Casein protein', 'Plant-based protein'] },
  { 'Weight Management': ['Fat burners', 'Appetite suppressants', 'Thermogenics'] },
  { 'Recovery and Muscle Repair': ['BCAAs', 'Electrolytes', 'Anti-inflammatories'] },
  { 'Vitamins and Minerals': ['Multivitamins', 'Single nutrients'] },
  { 'Hydration and Electrolytes': ['Electrolyte drinks', 'Hydration powders'] },
  { 'Joint and Bone Health': ['Joint support', 'Bone strength'] },
  { 'Endurance Enhancers': ['Cardio performance', 'Stamina boosters'] },
  { 'Hormone Support': ['Testosterone boosters', 'Estrogen blockers'] },
  { 'Herbal Supplements': ['Natural energy boosters', 'Stress reducers'] },
  { 'Metabolism Boosters': ['Fat metabolism', 'Carbohydrate metabolism'] },
]
