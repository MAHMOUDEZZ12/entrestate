
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
    '/support',
    '/sx3-mindmap',
    // Community pages are now under /me
    '/me/community',
    '/me/community/academy',
    '/me/community/roadmap',
    '/me/community/documentation',
    // Resources
    '/resources/flows',
    // Gem Admin
    '/gem',
    '/gem/sitemap',
    '/gem/system-health',
    '/gem/archive',
    '/gem/data-importer',
    '/gem/keys',
    // Main User Dashboard
    '/me'
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }));
  
  const solutionRoutes = [
    '/solutions/pro-search-eng-x3',
    '/solutions/estchat-x3',
    '/solutions/mega-listing-pro-2',
  ].map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
  }));

  const blogRoutes = appDetails.apps.map(app => ({
      url: `${siteUrl}/blog/${app.name.toLowerCase().replace(/\s/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
  }));
  
  const productRoutes = tools.map((tool) => ({
    url: `${siteUrl}/products/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const meToolRoutes = tools.map((tool) => ({
      url: `${siteUrl}/me/tool/${tool.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
  }));


  return [...staticRoutes, ...solutionRoutes, ...blogRoutes, ...productRoutes, ...meToolRoutes];
}
