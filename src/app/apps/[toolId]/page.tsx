

'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { tools } from '@/lib/tools-client';
import { blogContent } from '@/lib/blog-content';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { cn } from '@/lib/utils';

export default function AppDetailsPage() {
    const { toolId } = useParams<{ toolId: string }>();
    const feature = tools.find(t => t.id === toolId);
    const content = blogContent[toolId];

    if (!feature || !content) {
        return (
            <div className="flex min-h-screen flex-col bg-background">
                <main className="flex-1 text-center py-20">
                    <h1 className="text-4xl font-bold">Sorry, we couldn't find that app.</h1>
                    <Link href="/apps">
                        <Button variant="link" className="mt-4">Return to Apps</Button>
                    </Link>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
                <article>
                    <header className="mb-12 text-center">
                        <div className={cn("inline-block p-4 mb-6 text-white rounded-2xl bg-gradient-to-br")} style={{ backgroundColor: feature.color }}>
                            {React.cloneElement(feature.icon, { className: 'h-12 w-12' })}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
                            {content.title}
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
                            {content.intro}
                        </p>
                    </header>

                    <Card className="bg-card/50 backdrop-blur-lg border-primary/10 shadow-xl shadow-primary/10 overflow-hidden">
                        <CardContent className="p-8 md:p-10 space-y-8 text-lg text-foreground/80">
                            {content.sections.map((section, index) => (
                                <section key={index}>
                                    <h2 className="text-2xl font-bold text-foreground mb-3">{section.heading}</h2>
                                    <p>{section.body}</p>
                                </section>
                            ))}
                        </CardContent>
                    </Card>

                    <section className="mt-16 text-center">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to try it yourself?</h2>
                        <p className="text-lg text-foreground/60 mb-8">Stop waiting and start creating. Generate your first {content.cta} in seconds.</p>
                        <Link href={`/dashboard/tool/${feature.id}`}>
                            <ShinyButton>
                                Go to the {feature.title} Tool
                                <ArrowRight />
                            </ShinyButton>
                        </Link>
                    </section>
                </article>
            </main>
        </div>
    );
}
