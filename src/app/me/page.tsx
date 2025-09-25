
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles, Search, ArrowRight, Rss, Users2, Building } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

function SmartSearchHero() {
    const [query, setQuery] = React.useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/me/discover?q=${encodeURIComponent(query.trim())}`);
    };

    return (
        <section className="relative flex h-[60vh] min-h-[400px] w-full items-center justify-center overflow-hidden rounded-xl border bg-card shadow-lg">
            <div className="absolute inset-0 z-0 bg-grid-pattern opacity-10"></div>
            <div 
                className="absolute inset-0 z-0"
                style={{
                    background: `radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.1), transparent 70%)`
                }}
            />
            <div className="relative z-10 container mx-auto px-4 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-tighter leading-tight max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                    Your Intelligence Hub
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/70">
                    Search the market, ask a question, or discover community insights. Your AI assistant is ready.
                </p>
                <div className="mt-8 w-full max-w-2xl mx-auto">
                    <form onSubmit={handleSearch} className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-75 group-hover:opacity-100 transition-all duration-1000 group-hover:duration-200 animate-gradient-pulse"></div>
                        <div className="relative">
                            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder='e.g., "Find developers with off-plan projects in Dubai Hills"'
                                className="w-full h-14 pl-12 pr-4 text-lg rounded-full shadow-lg"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

const mockFeedItems = [
    { type: 'Update', title: 'Market Pulse Update', description: 'Dubai Marina sees a 3% increase in rental yields for 1-bedroom apartments in Q2 2024.', icon: <Rss /> },
    { type: 'Community', title: 'New Connection Request', description: 'Jane Doe is looking for a contact at Nakheel Properties. Can you help?', icon: <Users2 /> },
    { type: 'New Project', projectName: 'Verde', area: 'JLT', description: 'A new luxury residential tower has been added to the Market Library.', icon: <Building /> },
];


function CommunityFeed() {
    return (
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Today's Feed</h2>
            <div className="space-y-4">
                {mockFeedItems.map((item, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 bg-muted rounded-lg text-muted-foreground">{item.icon}</div>
                            <div>
                                 <CardTitle className="text-lg flex items-center gap-2">{item.icon} {item.title}</CardTitle>
                                 {item.projectName ? (
                                    <CardDescription>{item.projectName} in {item.area}</CardDescription>
                                 ) : (
                                    <CardDescription>{item.description}</CardDescription>
                                 )}
                            </div>
                        </CardHeader>
                        {item.projectName &&
                            <CardContent>
                                <p>{item.description}</p>
                            </CardContent>
                        }
                    </Card>
                ))}
            </div>
        </div>
    );
}

function QuickActions() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Link href="/me/tool/listing-generator"><Button variant="outline" className="w-full justify-start">Generate a New Listing</Button></Link>
                    <Link href="/me/flows"><Button variant="outline" className="w-full justify-start">Create a New Flow</Button></Link>
                    <Link href="/me/brand"><Button variant="outline" className="w-full justify-start">Update Brand Assets</Button></Link>
                </CardContent>
            </Card>
                <Card className="bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-primary">Go to Operations Hub</CardTitle>
                    <CardDescription>Access your tools, projects, and execution dashboards.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/me/workspace">
                        <Button className="w-full">
                            Open Workspace <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}

export default function MePage() {
    const { user } = useAuth();
    // This is the Intelligence Hub
    
    if (!user) {
        return (
            <div className="p-4 md:p-8 space-y-12 text-center">
                 <SmartSearchHero />
                 <p className="text-lg text-muted-foreground">Please log in to access your full workspace.</p>
                 <Link href="/me"><Button>Login</Button></Link>
            </div>
        )
    }
    
    return (
        <div className="p-4 md:p-8 space-y-12">
            <SmartSearchHero />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <CommunityFeed />
                <QuickActions />
            </div>
        </div>
    );
}
