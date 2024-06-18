/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif','image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/dlemt0qqz/image/upload/**',
            }
        ]
    }
}

export default nextConfig;
