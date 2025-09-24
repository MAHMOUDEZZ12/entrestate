'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { tools as allToolsClient } from '@/lib/tools-client';
import { appDetails } from '@/lib/blog-content';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { cn } from '@/lib/utils';

export default function BlogPage() {
    const { slug } = useParams<{ slug: string }>();
    const feature = allToolsClient.find(t => t.id === slug);
    const content = appDetails.apps.find(app => app.name.toLowerCase().replace(/\s/g, '-') === slug);

    if (!feature || !content) {
        return notFound();
    }
    
    const flowChain = content.chain.split('→').map(s => s.trim());
    const flowTools = flowChain.map(name => allToolsClient.find(t => t.title === name)).filter(Boolean) as (typeof allToolsClient[0])[];

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
                <article>
                    <header className="mb-12 text-center">
                        <div className={cn("inline-block p-4 mb-6 text-white rounded-2xl")} style={{ backgroundColor: feature.color }}>
                            {React.cloneElement(feature.icon, { className: 'h-12 w-12' })}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
                            {content.hero}
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
                            {content.full_description}
                        </p>
                    </header>

                    <Card className="bg-card/50 backdrop-blur-lg border-primary/10 shadow-xl shadow-primary/10 overflow-hidden">
                        <CardContent className="p-8 md:p-10 space-y-8 text-lg text-foreground/80">
                           <section>
                                <h2 className="text-2xl font-bold text-foreground mb-3">Key Features</h2>
                                <ul className="space-y-2 list-disc list-inside">
                                    {content.features.map((feat, index) => <li key={index}>{feat}</li>)}
                                </ul>
                           </section>
                           <section>
                                <h2 className="text-2xl font-bold text-foreground mb-3">The Advantage</h2>
                                <p>{content.difference_vs_native}</p>
                           </section>
                        </CardContent>
                    </Card>

                    <section className="mt-16 text-center">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Flow</h2>
                        <p className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto">This tool is most powerful when used in a flow. Here's the recommended automation to get the best results.</p>
                        
                        <Card className="bg-muted/50 border-dashed">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-center flex-wrap gap-4">
                                {flowTools.map((tool, index) => (
                                    <React.Fragment key={tool.id}>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-3 rounded-lg text-white" style={{ backgroundColor: tool.color }}>
                                        {React.cloneElement(tool.icon, { className: 'h-6 w-6' })}
                                        </div>
                                        <p className="text-xs font-semibold">{tool.title}</p>
                                    </div>
                                    {index < flowTools.length - 1 && <Plus className="h-6 w-6 text-muted-foreground" />}
                                    </React.Fragment>
                                ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="mt-8">
                            <Link href={`/me/flows`}>
                                <ShinyButton>
                                    Run This Flow
                                    <ArrowRight />
                                </ShinyButton>
                            </Link>
                        </div>
                    </section>
                </article>
            </main>
        </div>
    );
}
