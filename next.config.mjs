

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'customer-*.cloudflarestream.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'img.clerk.com' },
    ],
  },
  experimental: {
    serverActions: { allowedOrigins: ['aimeega.com', 'www.aimeega.com'] },
  },
}

export default nextConfig
