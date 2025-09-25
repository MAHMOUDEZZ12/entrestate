
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { getFirebase } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, KeyRound } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/logo';

export default function LoginPage() {
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
    const [isDevLoading, setIsDevLoading] = React.useState(false);

    const handleGoogleSignIn = async () => {
        const services = getFirebase();
        if (!services) return;
        setIsGoogleLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(services.auth, provider);
            toast({ title: "Signed In Successfully", description: "Welcome to Entrestate!" });
            router.push(searchParams.get('redirect') || '/me/workspace');
        } catch (error: any) {
            toast({ title: "Authentication Failed", description: error.message, variant: "destructive" });
        } finally {
            setIsGoogleLoading(false);
        }
    };
    
     const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const services = getFirebase();
        if (!services) return;
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await signInWithEmailAndPassword(services.auth, email, password);
            toast({ title: "Signed In Successfully" });
            localStorage.setItem('onboardingComplete', 'true');
            router.push(searchParams.get('redirect') || '/me/workspace');
        } catch (error: any) {
            toast({ title: "Authentication Failed", description: error.message, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeveloperSignIn = async () => {
        const services = getFirebase();
        if (!services) {
            toast({title: "Firebase not initialized", variant: "destructive"});
            return;
        }
        setIsDevLoading(true);
        const email = 'dev@entrestate.com';
        const password = 'gemini';
        try {
             // First, try to create the user. If they already exist, this will fail gracefully.
            try {
                await createUserWithEmailAndPassword(services.auth, email, password);
                toast({ title: "Developer Account Created", description: "Proceeding to login." });
            } catch (error: any) {
                if (error.code !== 'auth/email-already-in-use') {
                    throw error; // Re-throw unexpected errors
                }
                // If user exists, that's fine, we just proceed to log in.
            }
            
            // Now, sign in.
            await signInWithEmailAndPassword(services.auth, email, password);
            toast({ title: "Developer Access Granted", description: "Welcome, partner." });
            localStorage.setItem('onboardingComplete', 'true');
            router.push('/gem'); // Go directly to the admin dashboard

        } catch (error: any) {
            console.error("Developer Login Failed:", error);
            toast({ title: "Developer Login Failed", description: "An unexpected error occurred. Check the console for details.", variant: "destructive" });
        } finally {
            setIsDevLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/30">
            <Card className="w-full max-w-md mx-4 shadow-2xl">
                <CardHeader className="text-center space-y-4">
                    <Logo className="mx-auto" />
                    <CardTitle className="text-2xl">Welcome Back</CardTitle>
                    <CardDescription>Sign in to access your AI-powered workspace.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Button onClick={handleGoogleSignIn} variant="outline" className="w-full" disabled={isGoogleLoading || isDevLoading}>
                            {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Mail className="mr-2 h-4 w-4" />}
                            Google
                        </Button>
                         <Button onClick={handleDeveloperSignIn} variant="secondary" className="w-full" disabled={isGoogleLoading || isDevLoading}>
                            {isDevLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <KeyRound className="mr-2 h-4 w-4" />}
                            Dev Login
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                     <form onSubmit={handleEmailSignIn} className="space-y-4">
                         <div className="space-y-2">
                             <Label htmlFor="email">Email</Label>
                             <Input id="email" name="email" type="email" placeholder="m@example.com" required disabled={isDevLoading} />
                         </div>
                         <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required disabled={isDevLoading}/>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading || isDevLoading}>
                             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                 <CardFooter className="flex-col text-center text-sm gap-2">
                    <p>Don't have an account? <Link href="/pricing" className="underline font-semibold">Sign up</Link></p>
                    <Link href="/" className="text-xs text-muted-foreground underline">Back to Homepage</Link>
                </CardFooter>
            </Card>
        </div>
    )
}
