/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.dicebear.com",
            },
        ],
    },
    async redirects() {
        return [
            {
                source: "/agents/interview-preparation/interview",
                destination: "/agents/interview-preparation",
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
