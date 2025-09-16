
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, GitBranch, Cpu, Gamepad2, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const resourceItems = [
    {
        title: "The Handbook",
        description: "Actionable guides, tips, and hacks to get the most out of your AI toolkit.",
        href: "/blog",
        icon: <BookOpen className="h-8 w-8 text-primary" />,
    },
    {
        title: "Gemin Mindmap",
        description: "A visual overview of the powerful, interconnected tools in the Super Seller Suite.",
        href: "/sx3-mindmap",
        icon: <GitBranch className="h-8 w-8 text-primary" />,
    },
    {
        title: "Technology",
        description: "Learn about the cutting-edge AI models and frameworks that power the suite.",
        href: "/technology",
        icon: <Cpu className="h-8 w-8 text-primary" />,
    },
     {
        title: "Find the Key",
        description: "Take a break and play a little game created by your AI partner.",
        href: "/superfreetime",
        icon: <Gamepad2 className="h-8 w-8 text-primary" />,
    }
]

export default function ResourcesPage() {

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <PageHeader
            icon={<BookOpen className="h-8 w-8" />}
            title="Resources"
            description="Explore guides, technical documentation, and other helpful materials."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {resourceItems.map((item) => (
                <Link key={item.title} href={item.href} className="group">
                    <Card className="h-full hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all">
                        <CardHeader className="flex-row gap-4 items-center">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                {item.icon}
                            </div>
                            <div>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </div>
                            <ArrowRight className="h-5 w-5 ml-auto text-muted-foreground transition-transform group-hover:translate-x-1" />
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
