export { default as middleware } from 'next-auth/middleware'

export const config = {
  matcher: [
    // Match all routes that need authentication
    '/cart',
    '/shipping-address',
    '/orders/:path*',
    // Exclude these routes from middleware
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
