
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Sparkles, ArrowRight, TrendingUp, AlertTriangle, Filter } from 'lucide-react';
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
                       Navigate the future with unparalleled clarity. AIXA INTEL RE5.2 processes vast streams of public and private data to not just report on the market, but to predict its movements and identify your next opportunity.
                    </p>
                    <div className="mt-8">
                        <Link href="/signup">
                            <Button size="lg">Access Market Intelligence <ArrowRight /></Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">See the Market Before It Moves</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Our predictive intelligence engine gives you a decisive advantage, turning chaotic data into clear, actionable strategy.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Proactive Opportunity ID</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Discover untapped investment areas, emerging buyer needs, and off-market deals before they become common knowledge.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Multi-Factor Predictive Models</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Our forecasts consider hundreds of variables—from transaction data to social sentiment—for robust, reliable predictions.</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Strategic Risk Mitigation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Anticipate and prepare for potential market downturns or shifts in demand, protecting your portfolio and clients.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32 bg-muted/50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">How It Works</h2>
                        <p className="mt-4 text-lg text-muted-foreground">From raw data to predictive insight in three steps.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4"><Filter className="h-8 w-8"/></div>
                            <h3 className="text-xl font-bold mb-2">1. Data Aggregation</h3>
                            <p className="text-muted-foreground">AIXA continuously ingests data from official registries, listing portals, social media, and news outlets.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4"><TrendingUp className="h-8 w-8"/></div>
                            <h3 className="text-xl font-bold mb-2">2. Signal Processing</h3>
                            <p className="text-muted-foreground">The AI analyzes millions of data points to identify statistically significant patterns, anomalies, and trend correlations.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4"><AlertTriangle className="h-8 w-8"/></div>
                            <h3 className="text-xl font-bold mb-2">3. Actionable Alerts</h3>
                            <p className="text-muted-foreground">You receive clear, concise alerts and reports highlighting new opportunities and potential risks.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4">
                     <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Use Cases</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Make smarter decisions, faster.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader><CardTitle>Investor Advisory</CardTitle></CardHeader>
                            <CardContent><p>Confidently advise clients on the best-performing neighborhoods and property types by showing them predictive yield and appreciation data, moving beyond historical performance alone.</p></CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Developer Planning</CardTitle></CardHeader>
                            <CardContent><p>Inform project planning and land acquisition by identifying areas with the highest future demand. Validate a new tower's unit mix by analyzing demographic shifts and buyer interest trends before breaking ground.</p></CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Agent Prospecting</CardTitle></CardHeader>
                            <CardContent><p>Focus your marketing efforts on "hot" zones where selling or buying activity is projected to increase. Get alerts on neighborhoods with a sudden spike in rental searches, indicating a potential new investor market.</p></CardContent>
                        </Card>
                    </div>
                </div>
            </section>

             <section className="py-24 md:py-32 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold">Ready to Outsmart the Market?</h2>
                    <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">Gain an unfair advantage with predictive insights. Let AIXA guide your strategy.</p>
                    <div className="mt-8">
                        <Link href="/signup">
                            <Button size="lg" variant="secondary">Unlock Predictive Analytics</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
