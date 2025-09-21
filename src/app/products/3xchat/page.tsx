
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Sparkles, ArrowRight, MessageCircle, Bot, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage() {
    return (
        <main className="flex-1 w-full">
            <section className="relative py-20 md:py-32 text-center border-b overflow-hidden bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter max-w-4xl mx-auto">
                        3XCHAT APP LITE
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/70">
                        Transform every customer interaction into an opportunity. 3XCHAT is an AI-powered conversational platform engineered for immediate, impactful engagement that captures leads and delights users, 24/7.
                    </p>
                    <div className="mt-8">
                        <Link href="/signup">
                            <Button size="lg">Deploy Your AI Assistant <ArrowRight /></Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Engineered for Engagement</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Go beyond simple chatbots. 3XCHAT understands context, qualifies leads, and provides a consistently superior user experience.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>24/7 Availability</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Capture and qualify leads around the clock, ensuring you never miss an opportunity, no matter the time zone.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Proactive Lead Qualification</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Automatically identifies high-intent prospects, asks relevant questions, and gathers critical info for your sales team.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Contextual Memory</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Remembers past interactions to provide personalized, multi-turn dialogues that feel natural and intelligent.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            
            <section className="py-24 md:py-32 bg-muted/50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">How It Works</h2>
                        <p className="mt-4 text-lg text-muted-foreground">A simple, powerful workflow from data to conversation.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4"><Bot className="h-8 w-8"/></div>
                            <h3 className="text-xl font-bold mb-2">1. Train Your Bot</h3>
                            <p className="text-muted-foreground">Upload your project brochures, market data, and FAQs. The AI learns your inventory and business instantly.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4"><MessageCircle className="h-8 w-8"/></div>
                            <h3 className="text-xl font-bold mb-2">2. Deploy on Your Site</h3>
                            <p className="text-muted-foreground">Embed the chat widget on your website or landing pages with a single line of code.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4"><Zap className="h-8 w-8"/></div>
                            <h3 className="text-xl font-bold mb-2">3. Automate Engagement</h3>
                            <p className="text-muted-foreground">The AI Assistant proactively engages visitors, answers questions, and routes qualified leads directly to your CRM.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4">
                     <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Use Cases</h2>
                        <p className="mt-4 text-lg text-muted-foreground">From lead capture to customer support, 3XCHAT is your frontline agent.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader><CardTitle>Website Lead Capture</CardTitle></CardHeader>
                            <CardContent><p>Turn anonymous website visitors into qualified leads by answering their questions in real-time.</p></CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Project Launch Registration</CardTitle></CardHeader>
                            <CardContent><p>Build hype and a VIP list for new projects by allowing users to register their interest via chat.</p></CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>After-Hours Support</CardTitle></CardHeader>
                            <CardContent><p>Provide instant answers to common questions 24/7, improving customer satisfaction.</p></CardContent>
                        </Card>
                    </div>
                </div>
            </section>

             <section className="py-24 md:py-32 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold">Ready to Elevate Your Customer Experience?</h2>
                    <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">Start building your AI assistant today and transform your digital front door.</p>
                    <div className="mt-8">
                        <Link href="/signup">
                            <Button size="lg" variant="secondary">Get Started Now</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
