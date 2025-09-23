'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { LifeBuoy, ArrowRight, LayoutGrid, Sparkles, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Button } from '@/components/ui/button';
import { tools } from '@/lib/tools-data';

const solutions = [
  {
    slug: 'market-search-engine',
    title: 'Market Search Engine',
    description: "A powerful, multi-layered search engine for listings, trends, and market data.",
  },
  {
    slug: 'sales-agent-chat-ai',
    title: 'SalesAgentChat AI',
    description: "An advanced conversational AI that acts as a virtual sales agent on your website.",
  },
  {
    slug: 'ai-listing-portal',
    title: 'AI Listing Portal',
    description: "A complete, AI-managed portal for showcasing your property portfolio.",
  },
];

const services = [
    { title: "Market Data Listing", description: "Sourcing, verifying, and listing your property portfolio across all relevant portals." },
    { title: "Intel. Lead Generation", description: "AI-powered campaigns to find and qualify high-intent leads." },
    { title: "Web & App Development", description: "Custom websites, portals, and mobile apps for the real estate industry." },
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
            <section id="apps">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3"><LayoutGrid /> Apps Support</h2>
                    <p className="text-muted-foreground mt-2">Find guides and documentation for all our individual AI tools.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.filter(t => t.id !== 'superfreetime').map(tool => (
                        <Link href={`/apps/${tool.id}`} key={tool.id}>
                            <Card className="h-full hover:border-primary/50 transition-colors">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg text-white w-fit" style={{backgroundColor: tool.color}}>
                                            {React.createElement(eval(`require('lucide-react')['${tool.iconName}']`))}
                                        </div>
                                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
            
            <section id="solutions">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3"><Sparkles /> Solutions Support</h2>
                    <p className="text-muted-foreground mt-2">Learn more about our core, outcome-oriented product offerings.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {solutions.map(solution => (
                         <Link href={`/solutions/${solution.slug}`} key={solution.slug}>
                            <Card className="h-full hover:border-primary/50 transition-colors">
                                <CardHeader>
                                    <CardTitle className="text-lg">{solution.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{solution.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

             <section id="services">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3"><Briefcase /> Services Support</h2>
                    <p className="text-muted-foreground mt-2">Information about our professional, hands-on services.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map(service => (
                         <Link href="/services" key={service.title}>
                            <Card className="h-full hover:border-primary/50 transition-colors">
                                <CardHeader>
                                    <CardTitle className="text-lg">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{service.description}</p>
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