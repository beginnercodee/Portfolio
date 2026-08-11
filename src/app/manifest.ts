import { MetadataRoute } from 'next';

/**
 * Generates the web application manifest configuration for Progressive Web App (PWA) support,
 * specifying app names, display modes, theme colors, and icon paths.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jamal Nadeem | Automation Engineer',
    short_name: 'JN LABS',
    description: 'System architecture and autonomous workflows.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
