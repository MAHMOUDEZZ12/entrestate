
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, GitBranch, Cpu, Gamepad2, ArrowRight, BookCopy } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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

const internalNavLinks = [
    { name: 'Academy', href: '/academy' },
    { name: 'Handbook', href: '/blog' },
    { name: 'MindMap', href: '/sx3-mindmap' },
    { name: 'Documentation', href: '/documentation' },
    { name: 'Technology', href: '/technology' },
];

export default function ResourcesPage() {

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <PageHeader
            icon={<BookCopy className="h-8 w-8" />}
            title="Resources Hub"
            description="Explore guides, technical documentation, and other helpful materials."
        />

        <div className="mt-8 border rounded-lg">
            <nav className="p-4">
                <ul className="flex items-center gap-4 md:gap-6 text-sm md:text-base font-medium text-muted-foreground">
                    {internalNavLinks.map(link => (
                        <li key={link.name}>
                            <Link href={link.href} className="hover:text-primary transition-colors">{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <Separator />
            <div className="p-6 md:p-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            </div>
        </div>

      </main>
      <LandingFooter />
    </div>
  );
}
