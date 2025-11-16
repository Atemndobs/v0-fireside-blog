/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fireside_assets.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'ytqwwxlqqpqhhcpcqxax.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 's.rfi.fr',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'resources.tidal.com',
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
      },
      {
        protocol: 'https',
        hostname: '*.cloudflare.com',
      },
      {
        protocol: 'https',
        hostname: 'africanmusiclibrary.org',
      },
      {
        protocol: 'https',
        hostname: 'd31btwpnsku5px.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'chartroommedia.com',
      },
      {
        protocol: 'https',
        hostname: 'pan-african-music.com',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'external-content.duckduckgo.com',
      },
      {
        protocol: 'https',
        hostname: 'tse3.mm.bing.net',
      },
    ],
  },
}

export default nextConfig
