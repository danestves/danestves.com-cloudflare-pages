// Dependencies
import { NextResponse } from 'next/server'

export function middleware() {
  const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.twitter.com *.youtube.com plausible.io;
    child-src 'self' *.codepen.io *.cloudinary.com *.google.com *.twitter.com *.youtube.com codesandbox.io;
    style-src 'self' 'unsafe-inline' *.googleapis.com;
    img-src * blob: data:;
    media-src 'none';
    connect-src *;
    font-src 'self' *.googleapis.com *.amazonaws.com *.gstatic.com;
    worker-src 'self';
    object-src 'self';
    frame-src 'self' codepen.io codesandbox.io;
  `

  const response = NextResponse.next()

  response.headers.set(
    'Content-Security-Policy',
    ContentSecurityPolicy.replace(/\n/g, '')
  )
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  )
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-DNS-Prefetch-Control', 'on')

  return response
}
