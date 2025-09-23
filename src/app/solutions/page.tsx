
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Sparkles, Telescope, MessageCircle, FileJson } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

const solutions = [
  {
    slug: 'pro-search-eng-x3',
    title: 'PRO SEARCH ENG. x3',
    icon: <Telescope className="h-8 w-8" />,
    description: "The triple-engine of discovery: Fast, Smart, and Deep Search.",
  },
  {
    slug: 'estchat-x3',
    title: 'ESTCHAT X3',
    icon: <MessageCircle className="h-8 w-8" />,
    description: "The conversational frontline for your website, social media, and CRM.",
  },
  {
    slug: 'mega-listing-pro-2',
    title: 'MEGA LISTING PRO 2',
    icon: <FileJson className="h-8 w-8" />,
    description: "The unified market registry to consolidate and verify all listings.",
  },
];

export default function SolutionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full">
         <PageHeader
            title="Our Solutions"
            description="High-level, outcome-oriented products that solve major business problems for the real estate industry."
            icon={<Sparkles className="h-8 w-8" />}
          />
        
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map(solution => (
                    <Link href={`/me/solutions/${solution.slug}`} key={solution.slug}>
                        <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all hover:-translate-y-1 bg-card/50 backdrop-blur-lg">
                            <CardHeader>
                                <div className="p-4 bg-primary/10 text-primary rounded-2xl w-fit mb-4">
                                    {solution.icon}
                                </div>
                                <CardTitle>{solution.title}</CardTitle>
                                <CardDescription>{solution.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}
