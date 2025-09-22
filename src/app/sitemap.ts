
import { MetadataRoute } from 'next';
import { tools } from '@/lib/tools-data';
import { appDetails } from '@/lib/blog-content';


export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://entrestate.com'; // Replace with your actual domain

  const staticRoutes = [
    '/',
    '/apps',
    '/dashboard',
    '/pricing',
    '/solutions',
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
    '/discover',
    '/technology',
    '/resources/flows',
    '/products/estchat-x3',
    '/products/mega-listing-pro-2',
    '/products/pro-search-eng-x3',
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


  return [...staticRoutes, ...blogRoutes, ...toolRoutes, ...appRoutes];
}

    