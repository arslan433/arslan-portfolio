module.exports = {
  siteUrl: 'https://arslan-dev.vercel.app',
  generateRobotsTxt: true, 
  
  exclude: ['/admin', '/admin/*'],
  
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin', // no Search engines 
      },
    ],
  },
}
