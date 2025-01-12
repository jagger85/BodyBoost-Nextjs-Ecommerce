import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NEXTAUTH_URL?.startsWith('https://') ?? !!process.env.VERCEL_URL,
    })

    if (!token) {
      const signInUrl = new URL('/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', request.url)
      return NextResponse.redirect(signInUrl)
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    // Fallback to sign in page if there's an error
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

export const config = {
  matcher: [
    // Match all routes that need authentication
    '/cart',
    '/shipping-address',
    '/orders/:path*',
  ],
}
