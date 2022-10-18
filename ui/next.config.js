/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.API_URL}/api/:path*`,
                basePath: false
            }
        ]
    }
};
