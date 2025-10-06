// middleware.ts (ở root)
import { NextRequest, NextResponse } from 'next/server'


function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
  })
}

export function middleware(req: NextRequest) {
  const url = new URL(req.url)

  // Chỉ áp dụng cho /admin/*
  if (!url.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const auth = req.headers.get("authorization")
  if (!auth?.startsWith('Basic ')) return unauthorized()

  // Decode "Basic base64(user:pass)"
  const [, base64] = auth.split(' ')
  const [user, pass] = Buffer.from(base64, 'base64').toString().split(':')

  if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
    return unauthorized()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
