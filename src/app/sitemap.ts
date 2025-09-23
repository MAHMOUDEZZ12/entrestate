
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
    '/sx3-mindmap',
    '/support',
    '/gem',
    '/gem/sitemap',
    '/gem/system-health',
    '/gem/archive',
    '/gem/data-importer',
    '/gem/keys',
    '/me'
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }));
  
  const solutionRoutes = [
    '/solutions/social-media-chatbot',
    '/solutions/sales-agent-chat-ai',
    '/solutions/market-search-engine',
    '/solutions/ai-listing-portal',
    '/solutions/crm-system',
    '/solutions/ai-insta-bio-link',
    '/solutions/instagram-ad-value'
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
  
  const appRoutes = tools.map((tool) => ({
    url: `${siteUrl}/apps/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));


  return [...staticRoutes, ...solutionRoutes, ...blogRoutes, ...appRoutes];
}
