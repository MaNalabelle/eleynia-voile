/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
  },

  async headers() {
    return [
      {
        source: '/voile',
        headers: [
          { key: 'X-Robots-Tag',            value: 'noindex, nofollow' },
          { key: 'X-Frame-Options',          value: 'DENY' },
          { key: 'X-Content-Type-Options',   value: 'nosniff' },
        ],
      },
      {
        source: '/api/voile',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ]
  },
}

export default nextConfig
