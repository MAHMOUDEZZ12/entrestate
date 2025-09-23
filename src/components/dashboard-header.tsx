
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, Search, Bot } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { auth } from '@/lib/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { AssistantChat } from './assistant-chat';
import { Logo } from './logo';


export function DashboardHeader() {
  const { user } = useAuth();
  
  const handleLogout = async () => {
    await auth?.signOut();
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
        <div className="flex items-center gap-4">
          <Logo href="/me" />
        </div>
          
        <div className="flex-1 flex justify-center px-4">
           {/* The search bar is now replaced by the assistant popover */}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
             <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Bot className="h-5 w-5" />
                        <span className="sr-only">Open AI Assistant</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[440px] p-0" align="end">
                   <div className="h-[60vh] max-h-[700px] flex flex-col">
                     <AssistantChat />
                   </div>
                </PopoverContent>
            </Popover>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                    <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">My Account</p>
                    <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                    </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/me/settings"><Settings className="mr-2 h-4 w-4" /> Settings</Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                    <Link href="/me/assistant"><Bot className="mr-2 h-4 w-4" /> AI Command Center</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
  );
}
