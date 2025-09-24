
import { MetadataRoute } from 'next';
import { tools } from '@/lib/tools-data';
import { appDetails } from '@/lib/blog-content';
import { solutions } from '@/lib/solutions-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://www.entrestate.com';

  const staticRoutes = [
    '/',
    '/marketplace',
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
    '/solutions',
    '/technology',
    // Authenticated routes are not typically in a public sitemap
    // but we can list the entry point.
    '/me', 
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
  
  const solutionRoutes = solutions.map((solution) => ({
      url: `${siteUrl}/solutions/${solution.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
  }));

  return [...staticRoutes, ...blogRoutes, ...solutionRoutes];
}
