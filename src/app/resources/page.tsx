
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowRight, BookOpen, GitBranch, Users2, Sparkles, Workflow, Bot, School } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResourcesHeader } from '@/components/resources-header';

const resourceLinks = [
  {
    icon: <Workflow className="h-8 w-8 text-primary" />,
    title: 'Flow Library',
    description: 'Explore pre-built automations that connect your apps into powerful workflows. The fastest way to put your AI to work.',
    href: '/resources/flows',
    cta: 'Browse Flows',
  },
   {
    icon: <School className="h-8 w-8 text-primary" />,
    title: 'Market Academy',
    description: 'Become a certified expert. Our academy offers courses on mastering the market, from developer relations to AI strategy.',
    href: '/community/academy',
    cta: 'View Curriculum',
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Documentation',
    description: 'Dive deep into the technical details of our tools and APIs. Get started with our comprehensive guides.',
    href: '/documentation',
    cta: 'Read the Docs',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'Core Concepts',
    description: 'Understand the building blocks of the Entrestate ecosystem: Apps, Pilots, Flows, and the AI Core.',
    href: '/sx3-mindmap',
    cta: 'View the Mindmap',
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ResourcesHeader />
      <main className="flex-1">
        <PageHeader
            title="Resources"
            description="Your central hub for learning, inspiration, and technical documentation."
            icon={<BookOpen className="h-8 w-8" />}
        />
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resourceLinks.map((link) => (
                <Card key={link.title} className="flex flex-col bg-card/80 backdrop-blur-lg">
                <CardHeader>
                    {link.icon}
                    <CardTitle className="mt-4">{link.title}</CardTitle>
                    <CardDescription>{link.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-end">
                    <Link href={link.href} className="w-full">
                    <Button variant="outline" className="w-full">
                        {link.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    </Link>
                </CardContent>
                </Card>
            ))}
            </div>
        </div>
      </main>
    </div>
  );
}
