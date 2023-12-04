/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'*.googleusercontent.com',
      },
      {
        protocol:'https',
        hostname:'rob-food-ordering.s3.amazonaws.com',
      }
      ,
      {
        protocol:'https',
        hostname:'checkout.stripe.com',
      }
      ,
      {
        protocol:'https',
        hostname:'*.stripe.com',
      }
      ,
      // {
      //   protocol:'https',
      //   hostname:'*',
      // }
    ]
  }
}

module.exports = nextConfig
