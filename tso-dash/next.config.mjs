/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/shopify/:path*',
          destination: `https://${process.env.SHOPIFY_DOMAIN}/api/2024-10/:path*`,
        },
      ];
    },
    env: {
        NEXT_PUBLIC_SHOPIFY_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
        STOREFRONT_API: process.env.STOREFRONT_API,
    },
  };
  
  export default nextConfig;