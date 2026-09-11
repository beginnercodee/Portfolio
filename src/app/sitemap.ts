import { MetadataRoute } from 'next';
import { caseStudiesData } from '@/data/caseStudies';
import { getLogs } from '@/lib/blog';

/**
 * Generates the dynamic XML sitemap configuration for search engine crawlers,
 * defining root URLs, case study deep-dives, execution logs, last modified dates, and index priorities.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://jamalnadeem.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/logs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudiesData.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const logs = await getLogs();
  const logRoutes: MetadataRoute.Sitemap = logs.map((log) => ({
    url: `${baseUrl}/logs/${log.slug}`,
    lastModified: log.date ? new Date(log.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...logRoutes];
}
