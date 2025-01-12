import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Only check auth for protected routes
  const isProtectedRoute = ['/cart', '/shipping-address', '/orders'].some(route =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
      const signInUrl = new URL('/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', request.url)
      return NextResponse.redirect(signInUrl)
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

export const config = {
  matcher: [
    // Match all routes that need authentication
    '/cart',
    '/shipping-address',
    '/orders/:path*',
    // Also match product pages to preserve cart functionality
    '/product/:path*',
  ],
}
