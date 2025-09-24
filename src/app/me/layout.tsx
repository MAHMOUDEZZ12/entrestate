'use client';

import React, { useState, useEffect } from 'react';
import { GlobalChat } from '@/components/global-chat';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User } from 'lucide-react';
import { auth } from '@/lib/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';

export default function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const handleLogout = async () => {
    if (auth) {
        await auth.signOut();
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
       <div className="p-4 md:p-6 lg:p-8">
            <PageHeader
                title={user?.displayName ? `Welcome back, ${user.displayName}` : "My Workspace"}
                description="This is your intelligent command center for the real estate market."
            >
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} />
                                <AvatarFallback>
                                    {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <User />}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/me/settings">Settings</Link></DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="text-destructive">Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </PageHeader>
            <main className="flex-1 overflow-y-auto pb-24 pt-0">
                {children}
            </main>
        </div>
    </div>
  );
}
