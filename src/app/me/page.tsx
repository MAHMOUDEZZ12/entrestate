
'use client';

import React, { useState, useEffect } from 'react';
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

// This page is now exclusively for the unauthenticated landing state.
// The main workspace dashboard is at /me/workspace.
// The authentication form is now at /login.

export default function MePage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.replace('/me/workspace');
        } else if (!loading && !user) {
            router.replace('/login?redirect=/me/workspace');
        }
    }, [user, loading, router]);
    
    // Display a loader while checking auth state and redirecting
    return (
         <div className="p-4 md:p-8 space-y-12 flex items-center justify-center h-screen">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
         </div>
    );
}
