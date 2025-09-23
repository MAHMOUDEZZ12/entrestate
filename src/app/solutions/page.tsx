
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Sparkles, Telescope, MessageCircle, FileJson, LayoutGrid, Users, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const solutions = [
  {
    slug: 'social-media-chatbot',
    title: 'Social Media Chatbot',
    icon: <MessageCircle className="h-8 w-8" />,
    description: "Deploy an AI-powered chatbot on your social media channels to engage leads 24/7.",
  },
  {
    slug: 'sales-agent-chat-ai',
    title: 'SalesAgentChat AI',
    icon: <Sparkles className="h-8 w-8" />,
    description: "An advanced conversational AI that acts as a virtual sales agent on your website.",
  },
  {
    slug: 'market-search-engine',
    title: 'Market Search Engine',
    icon: <Telescope className="h-8 w-8" />,
    description: "A powerful, multi-layered search engine for listings, trends, and market data.",
  },
  {
    slug: 'ai-listing-portal',
    title: 'AI Listing Portal',
    icon: <LayoutGrid className="h-8 w-8" />,
    description: "A complete, AI-managed portal for showcasing your property portfolio.",
  },
   {
    slug: 'crm-system',
    title: 'CRM System',
    icon: <Users className="h-8 w-8" />,
    description: "An intelligent CRM that tracks leads, manages relationships, and automates follow-ups.",
  },
   {
    slug: 'ai-insta-bio-link',
    title: 'AI Insta BIO LINK',
    icon: <LinkIcon className="h-8 w-8" />,
    description: "A dynamic, AI-powered link-in-bio page that showcases your featured properties.",
  }
];

export default function SolutionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 w-full">
         <PageHeader
            title="Our Solutions"
            description="High-level, outcome-oriented products that solve major business problems for the real estate industry."
            icon={<Sparkles className="h-8 w-8" />}
          />
        
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map(solution => (
                    <Link href={`/solutions/${solution.slug}`} key={solution.slug}>
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
      <LandingFooter />
    </div>
  );
}
