import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export default authMiddleware({
  publicRoutes: ["/", "/login", "/signup", "/api/webhooks(.*)"],
  afterAuth(auth, req) {
    const url = req.nextUrl

    // Already logged in and on auth page -> redirect to discover
    if (auth.userId && (url.pathname === '/login' || url.pathname === '/signup')) {
      return NextResponse.redirect(new URL('/discover', req.url))
    }

    // Not logged in and on protected page -> redirect to login
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
})

export const config = {
  matcher: ["/((?!.+\.[\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
