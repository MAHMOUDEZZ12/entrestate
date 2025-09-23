
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, LayoutDashboard, Search, ChevronDown } from 'lucide-react';
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
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from './ui/avatar';
import { Logo } from './logo';
import { tools } from '@/lib/tools-data';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';


const iconMap: { [key: string]: React.ReactElement } = Object.fromEntries(
  Object.entries(LucideIcons).map(([name, Icon]) => [name, <Icon key={name} />])
);


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { tool: typeof tools[0] }
>(({ className, title, children, tool, ...props }, ref) => {
  return (
    <li>
      <Link href={`/me/tool/${tool.id}`} passHref legacyBehavior>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
           <div className="flex items-center gap-3">
                 <div className="p-2 rounded-md text-white" style={{backgroundColor: tool.color}}>
                    {React.cloneElement(iconMap[tool.iconName] || <LucideIcons.Sparkles />, { className: 'h-4 w-4' })}
                </div>
                <div>
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                    {children}
                    </p>
                </div>
           </div>
        </a>
      </Link>
    </li>
  )
})
ListItem.displayName = "ListItem"


export function DashboardHeader() {
  const { user } = useAuth();
  
  const handleLogout = async () => {
    await auth?.signOut();
  }

  const categorizedTools = {
      "Marketing & Ads": tools.filter(t => t.categories.includes('Marketing') || t.categories.includes('Ads')),
      "Creative Suite": tools.filter(t => t.categories.includes('Creative') || t.categories.includes('Editing')),
      "Sales & CRM": tools.filter(t => t.categories.includes('Sales Tools') || t.categories.includes('CRM') || t.categories.includes('Lead Gen')),
      "Market Intelligence": tools.filter(t => t.categories.includes('Market Intelligence')),
      "Core": [
          {id: 'brand', title: 'Brand & Assets', description: 'Manage your brand identity and AI knowledge base.', iconName: 'Palette', color: '#DA70D6', href:'/me/brand'},
          {id: 'flows', title: 'Flow Builder', description: 'Create powerful, automated workflows.', iconName: 'Workflow', color: '#DA70D6', href:'/me/flows'},
          {id: 'assistant', title: 'AI Assistant', description: 'Your AI co-pilot for the entire suite.', iconName: 'Bot', color: '#DA70D6', href:'/me/assistant'},
      ]
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
                        className="w-full max-w-xl justify-between text-muted-foreground h-10 px-4 text-base"
                    >
                        <div className="flex items-center gap-2">
                            <Search className="h-4 w-4" />
                            Explore Apps & Tools
                        </div>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                 <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[80vh] p-4" align="start">
                    <ScrollArea className="h-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {Object.entries(categorizedTools).map(([category, items]) => (
                                <div key={category}>
                                <DropdownMenuLabel>{category}</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <ul className="space-y-1">
                                    {items.map((tool: any) => (
                                        <ListItem
                                            key={tool.title}
                                            title={tool.title}
                                            tool={tool}
                                            href={tool.href || `/me/tool/${tool.id}`}
                                        >
                                            {tool.description}
                                        </ListItem>
                                    ))}
                                    </ul>
                                </DropdownMenuGroup>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
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
