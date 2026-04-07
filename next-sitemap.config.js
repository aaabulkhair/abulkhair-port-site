/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://abulkhair.ai',
  generateRobotsTxt: false, // We maintain our own robots.txt
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*', '/project'],
  transform: async (config, path) => {
    // Custom priority per page
    const priorityMap = {
      '/': 1.0,
      '/blog': 0.8,
      '/services/llm-consulting-egypt': 0.9,
      '/services/machine-learning-development': 0.9,
    };

    const changefreqMap = {
      '/': 'weekly',
      '/blog': 'weekly',
      '/services/llm-consulting-egypt': 'monthly',
      '/services/machine-learning-development': 'monthly',
    };

    return {
      loc: path,
      changefreq: changefreqMap[path] || config.changefreq,
      priority: priorityMap[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
