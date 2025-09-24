'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowRight, Rss } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { appDetails } from '@/lib/blog-content';
import { tools } from '@/lib/tools-data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { FilterCategory } from '@/types';

const posts = appDetails.apps.map(content => {
    const tool = tools.find(t => t.id === content.name.toLowerCase().replace(/\s/g, '-'));
    return {
        slug: content.name.toLowerCase().replace(/\s/g, '-'),
        title: content.hero,
        description: content.full_description,
        date: "July 29, 2024", // Placeholder date
        color: tool?.color || 'hsl(var(--primary))',
        categories: tool?.categories || []
    };
});

const allCategories = ['All', ...new Set(posts.flatMap(p => p.categories))] as FilterCategory[];


export default function BlogPage() {
    const [activeFilter, setActiveFilter] = React.useState<FilterCategory>('All');

    const filteredPosts = activeFilter === 'All' 
        ? posts
        : posts.filter(p => p.categories.includes(activeFilter));

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <PageHeader
          title="Entrestate Insights"
          description="Expert analysis, industry trends, and practical guides for the modern real estate professional."
          icon={<Rss className="h-8 w-8" />}
        />
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="flex justify-center flex-wrap gap-2 mb-12">
                {allCategories.map(category => (
                     <Button 
                        key={category}
                        variant={activeFilter === category ? "default" : "outline"}
                        onClick={() => setActiveFilter(category)}
                        className="rounded-full"
                    >
                        {category}
                    </Button>
                ))}
            </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="block break-inside-avoid">
                <Card className="flex flex-col h-full bg-card/80 backdrop-blur-lg hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl border-b-4"
                      style={{'--card-border-color': post.color, borderColor: 'var(--card-border-color)'} as React.CSSProperties} >
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {post.categories.slice(0, 2).map(cat => (
                            <Badge key={cat} variant="secondary" className="text-xs">{cat}</Badge>
                        ))}
                    </div>
                    <CardTitle className="text-xl font-bold font-heading">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground line-clamp-4">{post.description}</p>
                  </CardContent>
                  <CardFooter>
                      <Button variant="link" className="p-0 text-primary">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
