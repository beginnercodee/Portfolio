import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Preve
      // nt crawlers from indexing internal or private routing paths if needed
      disallow: ['/private/'],
    },
    sitemap: 'https://jamalnadeem.com/sitemap.xml',
  };
}
