
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, BookOpen, GitBranch, Users2, Workflow, School, X, Settings, LogOut, LayoutDashboard, ChevronDown, Bot, Palette, Database, Target, LineChart } from 'lucide-react';
import React from 'react';
import { GlobalSearch } from '@/components/ui/global-search';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation';
import { tools, Feature } from '@/lib/tools-client';
import { useTabManager } from '@/context/TabManagerContext';
import { cn } from '@/lib/utils';
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


export function DashboardHeader() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const pathname = usePathname();
  const { openTabs, activeTab, removeTab } = useTabManager();
  const { user } = useAuth();
  
  const handleLogout = async () => {
    await auth?.signOut();
  }

  return (
    <header className="sticky top-0 z-30 flex h-auto flex-col border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
       <div className="flex h-14 items-center gap-4">
            <Link href="/me">
                <Logo href="/me"/>
            </Link>
          
           <div className="ml-auto flex items-center gap-2">
              <div className="relative flex-1 md:grow-0">
                <Button variant="outline" className="w-full justify-start text-muted-foreground md:w-[200px] lg:w-[336px]" onClick={() => setIsSearchOpen(true)}>
                    <Search className="mr-2 h-4 w-4" />
                    <span className="truncate">Search tools, projects...</span>
                     <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </Button>
                <GlobalSearch isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
              </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
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
       </div>

       <div className="flex h-10 items-center overflow-x-auto overflow-y-hidden">
            <nav className="flex items-end gap-1 text-sm font-medium">
                {openTabs.map(tab => (
                    <div
                        key={tab.href}
                        className={cn("relative flex items-center h-full px-3 py-2 rounded-t-lg border-b-2 transition-colors",
                            activeTab?.href === tab.href 
                                ? "border-primary bg-primary/10 text-primary" 
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Link href={tab.href} className="pr-6">
                            {tab.label}
                        </Link>
                        {openTabs.length > 1 && (
                            <button onClick={(e) => { e.stopPropagation(); removeTab(tab.href); }} className="absolute right-1 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                                <X className="h-3 w-3" />
                                <span className="sr-only">Close tab</span>
                            </button>
                        )}
                    </div>
                ))}
            </nav>
       </div>
    </header>
  );
}
