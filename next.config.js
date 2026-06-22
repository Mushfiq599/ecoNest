/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "images.unsplash.com" },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
            },
            { protocol: "https", hostname: "res.cloudinary.com" },
            { protocol: "https", hostname: "i.ibb.co" }, // imgBB, in case you reuse it like TaskNova
        ],
        formats: ["image/avif", "image/webp"],
    },
    experimental: {
        optimizePackageImports: ["@heroui/react", "lucide-react"],
    },
};

module.exports = nextConfig;