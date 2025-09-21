
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Sparkles, ArrowRight, PenTool, Palette, Bot } from 'lucide-react';
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
                       Harness the cutting edge of generative intelligence. Craft contextually rich, persuasive, and perfectly tailored content that resonates with your audience, at scale.
                    </p>
                    <div className="mt-8">
                        <Link href="/signup">
                            <Button size="lg">Start Generating <ArrowRight /></Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Content that Converts</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Our Large Language Model is fine-tuned for real estate, understanding the nuances of property marketing and client communication.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Hyper-Personalized Content</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Generate unique emails, property descriptions, and social media posts for individual clients or specific market segments.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Stylistic Flexibility</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Instantly adapt tone, voice, and format to match any brand guideline or audience preference, from luxury to family-friendly.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Creative Ideation Engine</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Generates innovative campaign concepts, compelling headlines, and entire narrative structures to break through creative blocks.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32 bg-muted/50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">How It Works</h2>
                        <p className="mt-4 text-lg text-muted-foreground">A seamless flow from instruction to publication-ready content.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4"><PenTool className="h-8 w-8"/></div>
                            <h3 className="text-xl font-bold mb-2">1. Define Your Goal</h3>
                            <p className="text-muted-foreground">Provide a clear prompt and context. (e.g., "Write a luxury-style Instagram post for Emaar Beachfront").</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4"><Palette className="h-8 w-8"/></div>
                            <h3 className="text-xl font-bold mb-2">2. Apply Brand & Tone</h3>
                            <p className="text-muted-foreground">The model automatically infuses your brand's unique voice, colors, and style into the generated content.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4"><Sparkles className="h-8 w-8"/></div>
                            <h3 className="text-xl font-bold mb-2">3. Generate & Refine</h3>
                            <p className="text-muted-foreground">Receive multiple high-quality variants in seconds. Choose the best one or provide feedback for further refinement.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4">
                     <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Use Cases</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Automate your entire content marketing pipeline.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader><CardTitle>Automated Social Media Calendars</CardTitle></CardHeader>
                            <CardContent><p>Generate a full week's worth of engaging social media posts from a single topic or property.</p></CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Persuasive Listing Descriptions</CardTitle></CardHeader>
                            <CardContent><p>Create compelling, SEO-friendly property descriptions optimized for portals like Bayut and Property Finder.</p></CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Personalized Email Campaigns</CardTitle></CardHeader>
                            <CardContent><p>Draft entire multi-step email drip campaigns, from lead nurturing to new launch announcements.</p></CardContent>
                        </Card>
                    </div>
                </div>
            </section>

             <section className="py-24 md:py-32 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold">Ready to Automate Your Content?</h2>
                    <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">Spend less time writing and more time closing. Let our LLM become your 24/7 copywriter.</p>
                    <div className="mt-8">
                        <Link href="/signup">
                            <Button size="lg" variant="secondary">Start Your Free Trial</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
