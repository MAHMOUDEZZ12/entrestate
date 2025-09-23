
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, LayoutDashboard, ChevronDown, type LucideIcon } from 'lucide-react';
import React from 'react';
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback } from './ui/avatar';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import { tools as toolsData, ToolData } from '@/lib/tools-data';
import * as LucideIcons from 'lucide-react';

const iconMap = Object.fromEntries(
  Object.entries(LucideIcons).map(([name, Icon]) => [name, <Icon key={name} />])
) as Record<string, React.ReactElement>;


const marketingTools = toolsData.filter(t => t.categories.includes('Marketing') || t.categories.includes('Ads'));
const creativeTools = toolsData.filter(t => t.categories.includes('Creative') || t.categories.includes('Editing') || t.categories.includes('Web'));
const salesTools = toolsData.filter(t => t.categories.includes('Sales Tools') || t.categories.includes('CRM'));
const intelligenceTools = toolsData.filter(t => t.categories.includes('Market Intelligence'));
const workspaceTools = [
    { id: 'brand-assets', title: 'Brand & Assets', description: 'Manage your logos, colors, and AI knowledge base.', href: '/me/brand', iconName: 'Palette', color: '#DA70D6' },
    { id: 'leads-crm', title: 'Leads & CRM', description: 'Track your leads, clients, and sales pipeline.', href: '/me/leads', iconName: 'Target', color: '#FFA500' },
    { id: 'contacts-directory', title: 'Contacts Directory', description: 'Your private phone book of key real estate contacts.', href: '/me/directory', iconName: 'Users2', color: '#32CD32' },
];
const communityTools = [
    { id: 'community-notes', title: 'Community Notes', description: 'Connect, learn, and grow with other professionals.', href: '/me/community', iconName: 'Users2', color: '#4682B4' },
    { id: 'academy', title: 'Academy', description: 'Master the new landscape of real estate.', href: '/me/community/academy', iconName: 'School', color: '#4682B4' },
    { id: 'roadmap', title: 'Roadmap', description: 'See what we\'re building next.', href: '/me/community/roadmap', iconName: 'GitFork', color: '#4682B4' },
];


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { tool: ToolData | typeof workspaceTools[0] }
>(({ className, title, children, tool, ...props }, ref) => {
  const iconElement = iconMap[tool.iconName];
  return (
    <li>
      <NavigationMenuLink asChild>
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
                    {iconElement ? React.cloneElement(iconElement, { className: 'h-4 w-4' }) : <LucideIcons.Sparkles className="h-4 w-4" />}
                </div>
                <div>
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                        {children}
                    </p>
                </div>
            </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


export function DashboardHeader() {
  const { user } = useAuth();
  
  const handleLogout = async () => {
    await auth?.signOut();
  }

  const MegaMenu = ({category, items}: {category: string, items: (ToolData | typeof workspaceTools[0])[]}) => (
     <NavigationMenuItem>
        <NavigationMenuTrigger>{category}</NavigationMenuTrigger>
        <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
            {items.map((tool) => (
                <ListItem
                    key={tool.title}
                    title={tool.title}
                    href={(tool as any).href || `/me/tool/${tool.id}`}
                    tool={tool}
                >
                    {tool.description}
                </ListItem>
            ))}
            </ul>
        </NavigationMenuContent>
    </NavigationMenuItem>
  )


  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
       <div className="flex h-14 items-center gap-4">
             <Logo href="/me" />
        </div>
          
        <div className="flex-1 flex justify-center">
            <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                    <MegaMenu category="Apps" items={[...marketingTools, ...creativeTools]} />
                    <MegaMenu category="Intelligence" items={intelligenceTools} />
                    <MegaMenu category="Workspace" items={workspaceTools} />
                    <MegaMenu category="Community" items={communityTools} />
                </NavigationMenuList>
            </NavigationMenu>
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
