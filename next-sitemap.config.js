/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ethanecom.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/private-page'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
};
