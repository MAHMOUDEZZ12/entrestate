'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles, Search, ArrowRight, Rss, Users2, Building, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

function SmartSearchHero() {
    const [query, setQuery] = React.useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/discover/search?q=${encodeURIComponent(query.trim())}`);
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


function CommunityFeed() {
    const [notes, setNotes] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('/api/community/notes');
                const data = await response.json();
                if(data.ok) {
                    setNotes(data.data.slice(0, 3));
                }
            } catch (error) {
                console.error("Failed to fetch community notes", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchNotes();
    }, []);

    if (isLoading) {
        return (
            <div className="lg:col-span-2 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Today's Feed</h2>
            <div className="space-y-4">
                {notes.map((item, index) => (
                    <Card key={item.id}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 bg-muted rounded-lg text-muted-foreground"><Users2 /></div>
                            <div>
                                 <CardTitle className="text-lg">{item.title}</CardTitle>
                                 <CardDescription>Posted by {item.author}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">{item.content}</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="ghost" size="sm">View Note</Button>
                        </CardFooter>
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

const AuthForm = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

    const handleGoogleSignIn = async () => {
        if (!auth) return;
        setIsGoogleLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            toast({ title: "Signed In Successfully", description: "Welcome to Entrestate!" });
            router.push('/onboarding');
        } catch (error: any) {
            toast({ title: "Authentication Failed", description: error.message, variant: "destructive" });
        } finally {
            setIsGoogleLoading(false);
        }
    };
    
     const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!auth) return;
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({ title: "Signed In Successfully" });
            router.push('/me/workspace');
        } catch (error: any) {
            toast({ title: "Authentication Failed", description: error.message, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-4 md:p-8 min-h-[70vh]">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle>Welcome to Entrestate</CardTitle>
                    <CardDescription>Sign in to access your AI-powered workspace.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button onClick={handleGoogleSignIn} variant="outline" className="w-full" disabled={isGoogleLoading}>
                        {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Mail className="mr-2 h-4 w-4" />}
                        Continue with Google
                    </Button>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                     <form onSubmit={handleEmailSignIn} className="space-y-4">
                        <Input name="email" type="email" placeholder="Email" required />
                        <Input name="password" type="password" placeholder="Password" required />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In with Email
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default function MePage() {
    const { user, loading } = useAuth();
    
    if (loading) {
        return (
             <div className="p-4 md:p-8 space-y-12 flex items-center justify-center h-screen">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
             </div>
        );
    }
    
    if (!user) {
        return <AuthForm />;
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
