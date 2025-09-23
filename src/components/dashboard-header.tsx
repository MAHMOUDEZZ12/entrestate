
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, LayoutDashboard, Search } from 'lucide-react';
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
import { Logo } from './logo';
import { GlobalSearch } from './ui/global-search';


export function DashboardHeader() {
  const { user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const handleLogout = async () => {
    await auth?.signOut();
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
       <div className="flex items-center gap-4">
             <Logo href="/me" />
        </div>
          
        <div className="flex-1 flex justify-center px-4">
            <div className="w-full max-w-xl">
                 <Button
                    variant="outline"
                    className="w-full justify-between text-muted-foreground hover:text-foreground h-10 px-4"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <div className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        Search for apps, tools, or pages...
                    </div>
                    <kbd className="pointer-events-none hidden h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[14px] font-medium opacity-100 sm:flex">
                        <span className="text-lg">⌘</span>K
                    </kbd>
                </Button>
                <GlobalSearch isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
            </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
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
                    <Link href="/me"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/me/settings"><Settings className="mr-2 h-4 w-4" /> Settings</Link>
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

