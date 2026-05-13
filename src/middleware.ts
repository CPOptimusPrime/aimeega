import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/discover(.*)',
  '/trending(.*)',
  '/upload(.*)',
  '/profile(.*)',
  '/video(.*)',
  '/onboarding(.*)',
  '/api/videos(.*)',
  '/api/upload(.*)',
])

// Routes that are auth pages (redirect to /discover if already logged in)
const isAuthRoute = createRouteMatcher(['/login(.*)', '/signup(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
