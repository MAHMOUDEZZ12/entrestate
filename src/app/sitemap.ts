
import { MetadataRoute } from 'next';
import { tools } from '@/lib/tools-data';
import { appDetails } from '@/lib/blog-content';


export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://www.entrestate.com';

  const staticRoutes = [
    '/',
    '/apps',
    '/pricing',
    '/solutions',
    '/services',
    '/login',
    '/privacy',
    '/terms',
    '/status',
    '/about',
    '/documentation',
    '/cookies',
    '/blog',
    '/market',
    '/community',
    '/community/academy',
    '/community/roadmap',
    '/community/documentation',
    '/technology',
    '/resources/flows',
    '/products/estchat-x3',
    '/products/mega-listing-pro-2',
    '/products/pro-search-eng-x3',
    '/sx3-mindmap',
    '/dev',
    '/dev/sitemap',
    '/dev/system-health',
    '/dev/archive',
    '/dev/data-importer',
    '/dev/keys'
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }));

  const blogRoutes = appDetails.apps.map(app => ({
      url: `${siteUrl}/blog/${app.name.toLowerCase().replace(/\s/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
  }));
  
  const appRoutes = tools.map((tool) => ({
    url: `${siteUrl}/apps/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));


  return [...staticRoutes, ...blogRoutes, ...appRoutes];
}


