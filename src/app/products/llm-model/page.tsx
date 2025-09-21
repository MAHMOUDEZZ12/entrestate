
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage() {
    return (
        <main className="flex-1 w-full">
            <section className="relative py-20 md:py-32 text-center border-b overflow-hidden bg-gradient-to-br from-green-500/10 to-teal-500/10">
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter max-w-4xl mx-auto">
                        LLM MODEL X3.5
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/70">
                       Harness the cutting edge of generative intelligence to craft contextually rich, persuasive, and perfectly tailored content that resonates with your audience, at scale.
                    </p>
                    <div className="mt-8">
                        <Link href="/signup">
                            <Button size="lg">Get Started <ArrowRight /></Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Key Features</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Content generation that understands nuance and drives action.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Hyper-Personalized Content</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Generate unique messages, descriptions, and articles for individual clients or market segments.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Stylistic Flexibility</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Adapts tone, voice, and format to match any brand guideline or audience preference instantly.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Creative Ideation Engine</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Generates innovative concepts, headlines, and narrative structures to break creative blocks.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}
