
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, Search, Bot, Home, LayoutGrid, Workflow, Palette, Target, Users2, Database, LineChart, File, BrainCircuit, GitMerge, GanttChartSquare } from 'lucide-react';
import React, { useState, useEffect } from 'react';
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
import { motion } from 'framer-motion';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup } from './ui/command';


const pageLinks = {
  "Workspace": [
    { title: 'Home', href: '/me', icon: <Home className="mr-2 h-4 w-4" /> },
    { title: 'Apps', href: '/me/marketing', icon: <LayoutGrid className="mr-2 h-4 w-4" /> },
    { title: 'Flow Builder', href: '/me/flows', icon: <Workflow className="mr-2 h-4 w-4" /> },
    { title: 'AI Assistant', href: '/me/assistant', icon: <Bot className="mr-2 h-4 w-4" /> },
    { title: 'Brand & Assets', href: '/me/brand', icon: <Palette className="mr-2 h-4 w-4" /> },
    { title: 'Settings', href: '/me/settings', icon: <Settings className="mr-2 h-4 w-4" /> },
  ],
  "Intelligence": [
    { title: 'Market Library', href: '/me/tool/projects-finder', icon: <Database className="mr-2 h-4 w-4" /> },
    { title: 'Leads & CRM', href: '/me/leads', icon: <Target className="mr-2 h-4 w-4" /> },
    { title: 'Listing Performance', href: '/me/tool/listing-performance', icon: <LineChart className="mr-2 h-4 w-4" /> },
    { title: 'Contacts Directory', href: '/me/directory', icon: <Users2 className="mr-2 h-4 w-4" /> },
  ],
  "Public Site": [
    { title: 'Solutions', href: '/solutions', icon: <BrainCircuit className="mr-2 h-4 w-4" /> },
    { title: 'Pricing', href: '/pricing', icon: <File className="mr-2 h-4 w-4" /> },
    { title: 'Market Pulse', href: '/market', icon: <LineChart className="mr-2 h-4 w-4" /> },
    { title: 'Community', href: '/community', icon: <Users2 className="mr-2 h-4 w-4" /> },
    { title: 'Blog', href: '/blog', icon: <File className="mr-2 h-4 w-4" /> },
  ],
   "Developer": [
    { title: 'Dev Dashboard', href: '/dev', icon: <GanttChartSquare className="mr-2 h-4 w-4" /> },
    { title: 'Sitemap', href: '/dev/sitemap', icon: <GitMerge className="mr-2 h-4 w-4" /> },
  ],
}


export function DashboardHeader() {
  const { user } = useAuth();
  const [isDraggable, setIsDraggable] = useState(false);

   useEffect(() => {
    try {
      const savedValue = localStorage.getItem('isSearchDraggable');
      setIsDraggable(savedValue === 'true');
    } catch (e) {
      // Local storage might not be available
    }
  }, []);

  const handleLogout = async () => {
    await auth?.signOut();
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
       <div className="flex items-center gap-4">
            <Logo href="/me" />
        </div>
          
        <div className="flex-1 flex justify-center px-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button
                        variant="outline"
                        className="w-full max-w-lg justify-start text-muted-foreground h-10 px-4 text-base"
                    >
                        <div className="flex items-center gap-2">
                            <Search className="h-4 w-4" />
                            Search for apps, pages, or projects...
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                    asChild 
                    align="center" 
                    className="w-[90vw] max-w-[960px] p-0"
                >
                    <motion.div drag={isDraggable} dragMomentum={false} className="cursor-grab active:cursor-grabbing">
                       <Command>
                         <CommandInput placeholder="Type a command or search..." />
                         <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                                {Object.entries(pageLinks).map(([category, links]) => (
                                    <CommandGroup key={category} heading={category}>
                                        {links.map(link => (
                                             <Link key={link.href} href={link.href} passHref legacyBehavior>
                                                <CommandItem asChild>
                                                    <a className="flex items-center gap-3 rounded-md text-sm cursor-pointer">
                                                        {link.icon} {link.title}
                                                    </a>
                                                </CommandItem>
                                            </Link>
                                        ))}
                                    </CommandGroup>
                                ))}
                            </div>
                         </CommandList>
                       </Command>
                    </motion.div>
                </DropdownMenuContent>
            </DropdownMenu>
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
                    <Link href="/me"><LayoutGrid className="mr-2 h-4 w-4" /> Dashboard</Link>
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
