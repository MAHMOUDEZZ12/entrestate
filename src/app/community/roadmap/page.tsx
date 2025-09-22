
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { GitFork } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function RoadmapPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Product Roadmap"
        description="See what we're building next and help shape the future of real estate intelligence. (Coming Soon)"
        icon={<GitFork className="h-8 w-8" />}
      />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <Card className="bg-card/80 backdrop-blur-lg text-center">
            <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold font-heading">We're planning the future.</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Our public roadmap, featuring feature voting and transparent timelines, is currently in development.
                </p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
