/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

module.exports = {
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_API_URL:process.env.NEXT_PUBLIC_API_URL

  },
}

//module.exports = nextConfig
