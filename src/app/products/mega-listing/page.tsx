
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Sparkles, ArrowRight, Share2, Upload, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage() {
    return (
        <main className="flex-1 w-full">
            <section className="relative py-20 md:py-32 text-center border-b overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter max-w-4xl mx-auto">
                        MEGA LISTING PRO 2
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/70">
                       The definitive solution for property marketing syndication. Prepare your listing once, and distribute it across every major portal with a single click, ensuring maximum exposure with minimal effort.
                    </p>
                    <div className="mt-8">
                        <Link href="/signup">
                            <Button size="lg">Syndicate Your First Listing <ArrowRight /></Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Publish Everywhere, Instantly</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Stop wasting time with manual data entry. Our syndication engine is your single point of control for your entire property portfolio.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Maximized Market Reach</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Distribute your listings to hundreds of relevant platforms and portals, including Bayut, Property Finder, and Dubizzle.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Automated Content Adaptation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Intelligently tailors listing details, images, and descriptions for each portal's specific requirements and field names.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Eliminate Manual Entry</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Drastically reduce administrative burden and eliminate costly, embarrassing data entry errors across your listings.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32 bg-muted/50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">How It Works</h2>
                        <p className="mt-4 text-lg text-muted-foreground">A unified workflow for multi-channel distribution.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4"><Upload className="h-8 w-8"/></div>
                            <h3 className="text-xl font-bold mb-2">1. Create Master Listing</h3>
                            <p className="text-muted-foreground">Use the Listing Manager to create a single, perfect "source of truth" for your property with all details and media.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4"><Share2 className="h-8 w-8"/></div>
                            <h3 className="text-xl font-bold mb-2">2. Select Portals</h3>
                            <p className="text-muted-foreground">Choose the destination portals you want to publish to from our list of integrated platforms.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4"><CheckCircle className="h-8 w-8"/></div>
                            <h3 className="text-xl font-bold mb-2">3. Syndicate & Sync</h3>
                            <p className="text-muted-foreground">Click "Publish." The engine handles the rest, including validation, and keeps all portals in sync if you make updates.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4">
                     <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Use Cases</h2>
                        <p className="mt-4 text-lg text-muted-foreground">The operational backbone for modern agencies.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader><CardTitle>Large-Scale Project Launches</CardTitle></CardHeader>
                            <CardContent><p>Publish an entire off-plan project's inventory—hundreds of units—across all major portals in a single, coordinated push. Ensure every unit is accurately represented everywhere, instantly.</p></CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Agency Portfolio Management</CardTitle></CardHeader>
                            <CardContent><p>Ensure your entire agency's portfolio of listings is consistent, up-to-date, and professional everywhere online. Update a price once in the Listing Manager and see it reflected on all portals.</p></CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Individual Agent Efficiency</CardTitle></CardHeader>
                            <CardContent><p>Free up hours of an agent's time per week by eliminating repetitive data entry on multiple websites. A single agent can now manage the marketing for dozens of properties simultaneously.</p></CardContent>
                        </Card>
                    </div>
                </div>
            </section>

             <section className="py-24 md:py-32 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold">Ready to Reclaim Your Time?</h2>
                    <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">Stop the copy-paste. Manage your listings from a single source of truth and dominate the market.</p>
                    <div className="mt-8">
                        <Link href="/signup">
                            <Button size="lg" variant="secondary">Start Automating</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

    
