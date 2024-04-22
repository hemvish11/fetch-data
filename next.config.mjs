/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.fakercloud.com', 'cloudflare-ipfs.com'],
        unoptimized: true,

    },
};

export default nextConfig;
