import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export default authMiddleware({
  publicRoutes: ["/", "/login", "/signup", "/api/webhooks(.*)", "/api/users/check-username"],
  afterAuth(auth, req) {
    const url = req.nextUrl

    if (auth.userId && (url.pathname === '/login' || url.pathname === '/signup')) {
      return NextResponse.redirect(new URL('/discover', req.url))
    }

    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
})

export const config = {
  matcher: ["/((?!.+\.[\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
