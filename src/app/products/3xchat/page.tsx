
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
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
                        Transform customer interactions with an application engineered for immediate, impactful engagement. 3XCHAT APP LITE redefines responsiveness, ensuring every customer feels heard and valued, around the clock.
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
                        <p className="mt-4 text-lg text-muted-foreground">Engineered for efficiency and impact.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>24/7 Availability</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Provides uninterrupted support, capturing leads and answering queries globally.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Proactive Lead Qualification</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Identifies high-intent prospects and gathers critical information for your sales teams.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Contextual Recall</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Retains conversation history for personalized, multi-turn dialogues.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}
