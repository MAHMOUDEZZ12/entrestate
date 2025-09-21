
import { MetadataRoute } from 'next';
import { tools } from '@/lib/tools-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://entrestate.com'; // Replace with your actual domain

  const staticRoutes = [
    '/',
    '/apps',
    '/dashboard',
    '/pricing',
    '/sx3-mindmap',
    '/login',
    '/privacy',
    '/terms',
    '/status',
    '/about',
    '/documentation',
    '/cookies',
    '/superfreetime',
    '/blog',
    '/market',
    '/resources',
    '/community'
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }));

  const toolRoutes = tools.map((tool) => ({
    url: `${siteUrl}/dashboard/tool/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  const appRoutes = tools.map((tool) => ({
    url: `${siteUrl}/apps/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));


  return [...staticRoutes, ...toolRoutes, ...appRoutes];
}
