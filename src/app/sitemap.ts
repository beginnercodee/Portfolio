import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jamalnadeem.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    // We explicitly define imaginary but conceptually necessary boundaries
    // Note: Add any additional permanent structural routes here if you build them out (like /logs or /case-studies)
  ];
}
