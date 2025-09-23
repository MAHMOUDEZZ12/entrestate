
'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { LifeBuoy, ArrowRight, BookOpen, MessageSquare, Search, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const supportTopics = [
    {
        title: "Getting Started",
        description: "Your guide to setting up your workspace, connecting accounts, and launching your first campaign.",
        icon: <BookOpen className="h-6 w-6 text-primary" />,
        href: "/documentation"
    },
    {
        title: "Billing & Subscriptions",
        description: "Manage your plan, view invoices, and update your payment methods.",
        icon: <FileText className="h-6 w-6 text-primary" />,
        href: "/me/settings?tab=subscription"
    },
    {
        title: "Contact Us",
        description: "Can't find what you're looking for? Our team is here to help.",
        icon: <MessageSquare className="h-6 w-6 text-primary" />,
        href: "mailto:support@entrestate.com"
    }
];

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 w-full">
        <PageHeader
          title="Support Center"
          description="Your central hub for guides, documentation, and help with all our apps, solutions, and services."
          icon={<LifeBuoy className="h-8 w-8" />}
        />
        
        <div className="container mx-auto px-4 py-16 md:py-24 space-y-16">
            <section id="ai-agent">
                 <Card className="max-w-3xl mx-auto text-center bg-card/80 backdrop-blur-lg border-primary/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl md:text-3xl font-bold">AI Support Agent</CardTitle>
                        <CardDescription>Have a question? Ask our AI assistant for an instant answer.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <form className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input 
                                placeholder='e.g., "How do I connect my Facebook account?"' 
                                className="w-full h-12 pl-10 pr-4 text-base rounded-full"
                            />
                        </form>
                    </CardContent>
                </Card>
            </section>
            
            <section id="topics">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Browse Support Topics</h2>
                    <p className="text-muted-foreground mt-2">Find guides and information about common questions.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {supportTopics.map(topic => (
                        <Link href={topic.href} key={topic.title}>
                            <Card className="h-full hover:border-primary/50 transition-colors hover:shadow-lg hover:-translate-y-1">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            {topic.icon}
                                        </div>
                                        <CardTitle className="text-xl">{topic.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
