import { MetadataRoute } from 'next';

/**
 * Generates the robots.txt metadata configuration for web crawlers,
 * defining crawler access rules and linking the XML sitemap location.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Prevent crawlers from indexing internal or private routing paths if needed.
      disallow: ['/private/'],
    },
    sitemap: 'https://jamalnadeem.com/sitemap.xml',
  };
}
