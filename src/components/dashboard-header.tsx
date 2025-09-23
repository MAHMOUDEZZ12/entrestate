
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, Bot } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { auth } from '@/lib/firebase';
import { Logo } from './logo';
import { AssistantChat } from './assistant-chat';


export function DashboardHeader() {
  const { user } = useAuth();
  
  const handleLogout = async () => {
    await auth?.signOut();
    // The useAuth hook will handle the redirect to the login page.
  }

  return (
    <>
    <header className="sticky top-0 z-30 flex h-auto md:h-14 flex-col md:flex-row items-center gap-4 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
        <div className="flex items-center gap-4 self-start md:self-center pt-2 md:pt-0">
          <Logo href="/me" />
        </div>
          
        <div className="w-full md:flex-1">
            <AssistantChat />
        </div>

        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
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
