
'use client';

import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function AuthPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailAuth = async (isSigningUp: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      if (isSigningUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: "Account Created!", description: "Redirecting to get you set up..." });
        router.push('/dashboard/onboarding');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Login Successful", description: "Redirecting to your dashboard..." });
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
      toast({ title: isSigningUp ? "Signup Failed" : "Login Failed", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({ title: "Authentication Successful!", description: "Redirecting..." });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
      toast({ title: "Google Auth Failed", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };


  const AuthForm = ({ isSigningUp }: { isSigningUp: boolean }) => (
    <form onSubmit={(e) => { e.preventDefault(); handleEmailAuth(isSigningUp); }} className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            />
        </div>
        <div className="grid gap-2">
            <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {!isSigningUp && (
                <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                >
                    Forgot your password?
                </Link>
            )}
            </div>
            <Input 
            id="password" 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSigningUp ? 'Create an account' : 'Login'}
        </Button>
    </form>
  )


  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
             <Logo className="mb-4 justify-center" />
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details to access your account
            </p>
          </div>
          
            <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="pt-4">
                    <AuthForm isSigningUp={false} />
                </TabsContent>
                <TabsContent value="signup" className="pt-4">
                     <AuthForm isSigningUp={true} />
                </TabsContent>
            </Tabs>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full" onClick={handleGoogleAuth} disabled={isLoading} type="button">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 111.8 512 0 400.2 0 261.8 0 123.8 111.8 12.8 244 12.8c70.3 0 129.8 27.8 174.9 71.9l-64.4 64.4c-22.1-20.8-50.6-33.5-83.3-33.5-65.7 0-119.5 54.3-119.5 121.3s53.8 121.3 119.5 121.3c72.3 0 102.5-47.8 106.3-72.3H244v-83.8h236.1c2.3 12.7 3.9 26.1 3.9 40.8z"></path>
                </svg>
              }
              Google
            </Button>

        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
           data-ai-hint="abstract background"
        />
      </div>
    </div>
  )
}
