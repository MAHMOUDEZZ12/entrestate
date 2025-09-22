
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
    '/sx3-mindmap',
    '/login',
    '/signup',
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
    '/community',
    '/discover',
    '/solutions',
    '/technology'
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }));

  const productRoutes = [
      '/products/3xchat',
      '/products/aixa-intel',
      '/products/llm-model',
      '/products/mega-listing',
      '/products/pro-search',
  ].map(route => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
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


  return [...staticRoutes, ...productRoutes, ...blogRoutes, ...toolRoutes, ...appRoutes];
}

    

    
