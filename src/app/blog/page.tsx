
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowRight, Rss } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { blogContent } from '@/lib/blog-content';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';

// Convert the blogContent object into an array of posts
const posts = Object.entries(blogContent.apps).map(([slug, content]) => ({
    slug: content.name.toLowerCase().replace(/\s/g, '-'),
    title: content.hero,
    description: content.full_description,
    date: "July 29, 2024" // Placeholder date
}));

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.slug} className="flex flex-col bg-card/80 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold font-heading">{post.title}</CardTitle>
                  <CardDescription>{post.date}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground line-clamp-3">{post.description}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/blog/${post.slug}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
