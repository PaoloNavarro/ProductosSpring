/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/productos",
                permanent: false,
            }
        ]
    }
};

export default nextConfig;
