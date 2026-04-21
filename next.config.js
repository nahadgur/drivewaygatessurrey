/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Canonical host: www.drivewaygatessurrey.uk
      // Force non-www to www, permanent (308).
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'drivewaygatessurrey.uk' }],
        destination: 'https://www.drivewaygatessurrey.uk/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
