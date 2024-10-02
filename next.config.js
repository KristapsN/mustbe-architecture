/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_MAP_API_KEY: "AIzaSyDxq0hhH6IQfnzKMCCjnUUSTc2b0s_uzG8",
    MAP_ID: "7347b8bb47bd883b"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        // port: '',
        pathname: '/images/59cavtfx/production/**',
      },
    ],
  },
}

module.exports = nextConfig
