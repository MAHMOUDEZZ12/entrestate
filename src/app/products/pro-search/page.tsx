
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage() {
    return (
        <main className="flex-1 w-full">
            <section className="relative py-20 md:py-32 text-center border-b overflow-hidden bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter max-w-4xl mx-auto">
                        PRO SEARCH ENG.x 3
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/70">
                       Move beyond keyword matching. Our advanced search engine dives into the semantic fabric of information, revealing connections and insights that traditional systems miss.
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
                        <p className="mt-4 text-lg text-muted-foreground">Find answers, not just documents.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Hyper-Relevant Results</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Drastically reduces time spent sifting through irrelevant information and documents.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Hidden Pattern Discovery</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Identifies non-obvious correlations and emerging trends from your data.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Cross-Source Synthesis</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Unifies information from disparate internal and external repositories into one answer.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}
