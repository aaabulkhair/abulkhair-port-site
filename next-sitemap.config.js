/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://abulkhair.ai',
  generateRobotsTxt: false, // We maintain our own robots.txt
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*'],
  transform: async (config, path) => {
    const priorityMap = {
      '/': 1.0,
      '/services': 0.9,
      '/blog': 0.8,
    };

    let priority = priorityMap[path];
    let changefreq = config.changefreq;

    if (path.startsWith('/services/')) {
      priority = 0.9;
      changefreq = 'monthly';
    } else if (path.startsWith('/blog/')) {
      priority = 0.7;
      changefreq = 'monthly';
    }

    // No lastmod: stamping every URL "modified now" on each deploy teaches
    // crawlers to ignore the signal entirely.
    return {
      loc: path,
      changefreq,
      priority: priority ?? config.priority,
    };
  },
};
