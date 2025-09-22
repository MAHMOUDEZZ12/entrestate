
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowRight, Rss } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { appDetails } from '@/lib/blog-content';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { tools } from '@/lib/tools-client';
import { cn } from '@/lib/utils';


const posts = appDetails.apps.map(content => {
    const tool = tools.find(t => t.id === content.name.toLowerCase().replace(/\s/g, '-'));
    return {
        slug: content.name.toLowerCase().replace(/\s/g, '-'),
        title: content.hero,
        description: content.full_description,
        date: "July 29, 2024", // Placeholder date
        color: tool?.color || 'hsl(var(--primary))'
    };
});

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1">
        <PageHeader
          title="Entrestate Insights"
          description="Expert analysis, industry trends, and practical guides for the modern real estate professional."
          icon={<Rss className="h-8 w-8" />}
        />
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="block break-inside-avoid">
                <Card className="flex flex-col bg-card/80 backdrop-blur-lg hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl"
                      style={{'--card-border-color': post.color} as React.CSSProperties} >
                  <CardHeader className="border-b-2 border-[var(--card-border-color)]">
                    <CardTitle className="text-xl font-bold font-heading">{post.title}</CardTitle>
                    <CardDescription>{post.date}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pt-6">
                    <p className="text-muted-foreground line-clamp-4">{post.description}</p>
                  </CardContent>
                  <CardFooter>
                      <Button variant="link" className="p-0">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
