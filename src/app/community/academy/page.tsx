'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { School } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AcademyPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="WhatsMAP Academy"
        description="Learn the strategies and workflows of top-performing real estate professionals. (Coming Soon)"
        icon={<School className="h-8 w-8" />}
      />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <Card className="bg-card/80 backdrop-blur-lg text-center">
            <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold font-heading">The curriculum is being developed.</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    We are working with industry leaders to create courses on AI-powered lead generation, automated marketing, and more. Stay tuned.
                </p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
