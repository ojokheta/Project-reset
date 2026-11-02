/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The site is now a single continuous page — old route URLs land on the
  // matching section anchor.
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/purpose', destination: '/#purpose', permanent: true },
      { source: '/help', destination: '/#get-help', permanent: true },
      { source: '/involve', destination: '/#get-involved', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
    ]
  },
}
export default nextConfig
