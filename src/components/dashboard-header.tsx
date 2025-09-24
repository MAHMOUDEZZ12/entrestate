
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, Settings } from 'lucide-react';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { auth } from '@/lib/firebase';
import { Logo } from './logo';


export function DashboardHeader() {
  const { user } = useAuth();
  
  const handleLogout = async () => {
    if (auth) {
        await auth.signOut();
    }
    // The useAuth hook will handle the redirect to the login page.
  }

  return (
    <>
    <header className="sticky top-0 z-30 flex h-14 flex-row items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
        <div className="flex items-center gap-4 sm:hidden">
          <Logo href="/me" />
        </div>
        
        <div className="ml-auto flex items-center gap-2 flex-shrink-0">
             <Link href="/me/settings">
                 <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                 </Button>
            </Link>
             {user && (
                <Button variant="ghost" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            )}
        </div>
    </header>
    </>
  );
}
