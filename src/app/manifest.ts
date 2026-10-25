import { MetadataRoute } from 'next';

/**
 * Generates the web application manifest configuration for Progressive Web App (PWA) support,
 * specifying app names, display modes, theme colors, and icon paths.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jamal Nadeem | Full-Stack & AI Automation Engineer',
    short_name: 'JN LABS',
    description: 'Full-stack software engineering, system architecture, and autonomous AI workflows.',
    lang: 'en',
    dir: 'ltr',
    start_url: '/',
    scope: '/',
    id: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#000000',
    theme_color: '#000000',
    categories: ['technology', 'development', 'portfolio'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
