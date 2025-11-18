import { updateSession } from '@/lib/supabase/middleware'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Add aggressive caching for map tiles
  if (request.nextUrl.pathname.startsWith('/api/map-tiles')) {
    const response = NextResponse.next()
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    response.headers.set('CDN-Cache-Control', 'public, max-age=31536000, immutable')
    response.headers.set('Cloudflare-CDN-Cache-Control', 'public, max-age=31536000')
    return response
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return await updateSession(request)
  }

  // Allow all other routes
  return
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
