
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, LayoutGrid, Palette, Workflow, Store, Database, Target, Users2, School, BookOpen, Brain, GanttChartSquare, User as UserIcon, Sparkles, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { auth } from '@/lib/firebase';
import { Logo } from './logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
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
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


export function WorkspaceHeader() {
  const { user } = useAuth();
  
  const handleLogout = async () => {
    if (auth) {
        await auth.signOut();
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-auto flex">
          <div className="mr-6 flex items-center space-x-2">
            <Logo href="/me" />
          </div>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/me" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Workspace
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                
                 <NavigationMenuItem>
                    <Link href="/me/discover" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Discovery
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                 <NavigationMenuItem>
                    <NavigationMenuTrigger>Studio</NavigationMenuTrigger>
                    <NavigationMenuContent>
                         <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            <ListItem href="/me/marketing" title="Marketplace">
                                Discover and add powerful AI apps to your workspace.
                            </ListItem>
                            <ListItem href="/me/flows" title="Flow Builder">
                                Create powerful, automated workflows by connecting your apps.
                            </ListItem>
                             <ListItem href="/me/brand" title="Brand & Assets">
                                Manage your brand identity and the Knowledge Base for your AI assistant.
                            </ListItem>
                         </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                
                 <NavigationMenuItem>
                    <Link href="/solutions" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Solutions
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
               
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-4">
            <Link href="/gem">
                <Button variant="ghost" size="sm">
                    <GanttChartSquare className="mr-2 h-4 w-4" />
                    Gem
                </Button>
            </Link>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} />
                            <AvatarFallback>
                                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon />}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/me/settings" className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

      </div>
    </header>
  );
}
