import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  },
  
  // Comentado para evitar el error de critters en producción
  // experimental: {
  //   optimizeCss: true,
  // }
};

export default nextConfig;