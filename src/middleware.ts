import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/", "/login", "/signup", "/api/webhooks(.*)"],
  ignoredRoutes: ["/api/webhooks(.*)"],
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      const loginUrl = new URL('/login', req.url)
      return Response.redirect(loginUrl)
    }
  }
})

export const config = {
  matcher: ["/((?!.+\.[\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
