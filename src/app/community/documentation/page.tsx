
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function DocumentationPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Documentation"
        description="Your comprehensive guide to every tool, feature, and workflow in the Entrestate ecosystem."
        icon={<BookOpen className="h-8 w-8" />}
      />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <Card className="bg-card/80 backdrop-blur-lg text-center">
            <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold font-heading">We're writing the book.</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Our team is currently documenting every feature to provide you with a clear, searchable, and comprehensive guide to mastering Entrestate. The full documentation site will launch alongside our Public API.
                </p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
