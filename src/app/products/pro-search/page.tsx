
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Sparkles, ArrowRight, Layers, FileText, Search } from 'lucide-react';
import Link from 'next/link';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';

export default function ProductPage() {
    return (
        <div className="flex flex-col min-h-screen">
        <LandingHeader />
        <main className="flex-1 w-full">
            <section className="relative py-20 md:py-32 text-center border-b overflow-hidden bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter max-w-4xl mx-auto">
                        PRO SEARCH ENG.x 3
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/70">
                       Move beyond keyword matching. Our advanced search engine understands intent and context, diving into the semantic fabric of your data to reveal insights that traditional systems miss.
                    </p>
                    <div className="mt-8">
                        <Link href="/signup">
                            <Button size="lg">Integrate Pro Search <ArrowRight /></Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Find Answers, Not Just Documents</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Our semantic search engine delivers unparalleled relevance and accuracy, saving your team time and unlocking hidden value in your data.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Hyper-Relevant Results</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Understands natural language queries to drastically reduce time spent sifting through irrelevant information.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Hidden Pattern Discovery</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Identifies non-obvious correlations, market trends, and customer patterns from your unstructured data.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Cross-Source Synthesis</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Unifies information from disparate internal and external repositories into a single, cohesive answer.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            
            <section className="py-24 md:py-32 bg-muted/50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">How It Works</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Transform your knowledge into an intelligent, searchable asset.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4"><Layers className="h-8 w-8"/></div>
                            <h3 className="text-xl font-bold mb-2">1. Ingest Your Data</h3>
                            <p className="text-muted-foreground">Connect your data sources—brochures, reports, CRM notes, public websites—to our secure ingestion pipeline.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4"><FileText className="h-8 w-8"/></div>
                            <h3 className="text-xl font-bold mb-2">2. Create Vector Embeddings</h3>
                            <p className="text-muted-foreground">Our engine converts your documents into vector representations, capturing their semantic meaning.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4"><Search className="h-8 w-8"/></div>
                            <h3 className="text-xl font-bold mb-2">3. Query in Natural Language</h3>
                            <p className="text-muted-foreground">Ask complex questions and get precise answers synthesized from across all your connected data sources.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4">
                     <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Use Cases</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Powering the next generation of real estate intelligence.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader><CardTitle>Intelligent Agent Assistant</CardTitle></CardHeader>
                            <CardContent><p>Empower your agents to instantly find any property detail, market statistic, or client history note just by asking. "Which client was interested in golf course villas last month?"</p></CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Public-Facing Discovery</CardTitle></CardHeader>
                            <CardContent><p>Create a powerful, engaging search experience for your customers. Instead of simple filters, allow them to search for "a family-friendly community with good schools and a park."</p></CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Internal Knowledge Management</CardTitle></CardHeader>
                            <CardContent><p>Build a "second brain" for your entire organization. Make all internal documents, training materials, and market reports instantly accessible through a single, intelligent search bar.</p></CardContent>
                        </Card>
                    </div>
                </div>
            </section>

             <section className="py-24 md:py-32 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold">Ready to Unlock Your Data's Potential?</h2>
                    <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">Stop searching and start finding. Let Pro Search become the intelligent core of your operations.</p>
                    <div className="mt-8">
                        <Link href="/signup">
                            <Button size="lg" variant="secondary">Request a Demo</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
        <LandingFooter />
        </div>
    );
}
