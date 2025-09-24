
import { MetadataRoute } from 'next';
import { tools } from '@/lib/tools-data';
import { appDetails } from '@/lib/blog-content';
import { solutions } from '@/lib/solutions-data';


export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://www.entrestate.com';

  const staticRoutes = [
    '/',
    '/pricing',
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
    '/superfreetime',
    '/solutions',
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
    '/me',
    '/me/solutions',
    '/me/marketing',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }));
  
  const solutionRoutes = solutions.map((solution) => ({
      url: `${siteUrl}/solutions/${solution.slug}`,
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
  
  const meToolRoutes = tools.map((tool) => ({
      url: `${siteUrl}/me/tool/${tool.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
  }));

  return [...staticRoutes, ...solutionRoutes, ...blogRoutes, ...meToolRoutes];
}
