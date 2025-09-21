
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage() {
    return (
        <main className="flex-1 w-full">
            <section className="relative py-20 md:py-32 text-center border-b overflow-hidden bg-gradient-to-br from-red-500/10 to-orange-500/10">
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter max-w-4xl mx-auto">
                        AIXA INTEL RE5.2
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/70">
                       Navigate the future with unparalleled clarity. AIXA INTEL RE5.2 processes vast streams of data to not just report, but to predict market movements and identify opportunities.
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
                        <p className="mt-4 text-lg text-muted-foreground">Predictive intelligence for a competitive edge.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Proactive Opportunity Identification</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Discover untapped markets or emerging client needs before your competitors do.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Multi-factor Predictive Models</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Considers hundreds of variables for robust, reliable, and transparent forecasts.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Risk Mitigation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Anticipate and prepare for potential market downturns or operational challenges.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}
