
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
import { tools as toolsData, ToolData } from '@/lib/tools-data';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';

const iconMap: { [key: string]: React.ReactElement } = Object.fromEntries(
  Object.entries(LucideIcons).map(([name, Icon]) => [name, <Icon key={name} />])
);

interface MegaMenuItem {
    id: string;
    title: string;
    href: string;
    iconName: string;
    color?: string;
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { item: MegaMenuItem }
>(({ className, title, children, item, ...props }, ref) => {
  return (
    <li>
      <Link href={item.href} passHref legacyBehavior>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
           <div className="flex items-center gap-3">
                 <div className="p-2 rounded-md text-white" style={{backgroundColor: item.color || 'hsl(var(--primary))'}}>
                    {React.cloneElement(iconMap[item.iconName] || <LucideIcons.Sparkles />, { className: 'h-4 w-4' })}
                </div>
                <div className="text-sm font-medium leading-none">{title}</div>
           </div>
        </a>
      </Link>
    </li>
  )
})
ListItem.displayName = "ListItem"


export function DashboardHeader() {
  const { user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const handleLogout = async () => {
    await auth?.signOut();
  }

 const categorizedTools: Record<string, MegaMenuItem[]> = {
      "Core Workspace": [
          {id: 'home', title: 'Home', href:'/me', iconName: 'Home', color: '#8A2BE2'},
          {id: 'marketing', title: 'Apps', href:'/me/marketing', iconName: 'LayoutGrid', color: '#8A2BE2'},
          {id: 'flows', title: 'Flow Builder', href:'/me/flows', iconName: 'Workflow', color: '#8A2BE2'},
          {id: 'brand', title: 'Brand & Assets', href:'/me/brand', iconName: 'Palette', color: '#8A2BE2'},
          {id: 'assistant', title: 'AI Assistant', href:'/me/assistant', iconName: 'Bot', color: '#8A2BE2'},
          {id: 'leads', title: 'Leads (CRM)', href:'/me/leads', iconName: 'Target', color: '#FFA500'},
          {id: 'clients', title: 'Client Pages', href:'/me/clients', iconName: 'Users', color: '#FFA500'},
          {id: 'directory', title: 'Contacts Directory', href:'/me/directory', iconName: 'BookUser', color: '#FFA500'},
          {id: 'projects-finder', title: 'Market Library', href:'/me/tool/projects-finder', iconName: 'Database', color: '#00CED1'},
          {id: 'listing-performance', title: 'Listing Performance', href:'/me/tool/listing-performance', iconName: 'BarChart', color: '#00CED1'},
      ],
       "Public Site": [
          {id: 'public-home', title: 'Main Home', href:'/', iconName: 'Home', color: '#6a788c'},
          {id: 'public-solutions', title: 'Solutions', href:'/solutions', iconName: 'Sparkles', color: '#6a788c'},
          {id: 'public-apps', title: 'App Store', href:'/apps', iconName: 'LayoutGrid', color: '#6a788c'},
          {id: 'public-pricing', title: 'Pricing', href:'/pricing', iconName: 'CreditCard', color: '#6a788c'},
          {id: 'public-market', title: 'Market Pulse', href:'/market', iconName: 'LineChart', color: '#6a788c'},
          {id: 'public-blog', title: 'Blog', href:'/blog', iconName: 'Rss', color: '#6a788c'},
          {id: 'public-about', title: 'About Us', href:'/about', iconName: 'Info', color: '#6a788c'},
          {id: 'public-community', title: 'Community Hub', href:'/community', iconName: 'Users2', color: '#6a788c'},
      ],
      "Developer Zone": [
          {id: 'dev-home', title: 'Dev Dashboard', href:'/dev', iconName: 'GanttChartSquare', color: '#444'},
          {id: 'dev-health', title: 'System Health', href:'/dev/system-health', iconName: 'HeartPulse', color: '#444'},
          {id: 'dev-archive', title: 'Developer Archive', href:'/dev/archive', iconName: 'Database', color: '#444'},
          {id: 'dev-sitemap', title: 'Sitemap', href:'/dev/sitemap', iconName: 'GitMerge', color: '#444'},
          {id: 'dev-keys', title: 'API Keys', href:'/dev/keys', iconName: 'Key', color: '#444'},
          {id: 'dev-importer', title: 'Data Importer', href:'/dev/data-importer', iconName: 'Upload', color: '#444'},
      ],
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
                        className="w-full max-w-sm justify-between text-muted-foreground h-10 px-4 text-base"
                    >
                        <div className="flex items-center gap-2">
                            <Search className="h-4 w-4" />
                            Explore Workspace...
                        </div>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                 <DropdownMenuContent className="w-[calc(var(--radix-dropdown-menu-trigger-width)_*_2.5)] max-w-6xl max-h-[80vh] p-4" align="start">
                    <ScrollArea className="h-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(categorizedTools).map(([category, items]) => (
                                <div key={category}>
                                <DropdownMenuLabel>{category}</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <ul className="space-y-1">
                                    {items.map((item) => (
                                        <ListItem
                                            key={item.id}
                                            title={item.title}
                                            item={item}
                                        />
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
