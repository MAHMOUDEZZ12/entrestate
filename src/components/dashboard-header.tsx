
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, BookOpen, GitBranch, Users2, Workflow, School, X, Settings, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
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
import { tools, FilterCategory } from '@/lib/tools-client';
import { DashboardSidebar } from './dashboard-sidebar';
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback } from './ui/avatar';


const breadcrumbNameMap: { [key: string]: string } = {
    '/me': 'Home',
    '/me/marketing': 'Apps',
    '/me/brand': 'Brand & Assets',
    '/me/assistant': 'AI Command Center',
    '/me/settings': 'Settings',
    '/me/dev-admin': 'Developer Admin',
    '/me/flows': 'Flow Builder',
    '/me/clients': 'Client Pages',
    '/me/leads': 'Leads (CRM)',
    '/onboarding': 'Onboarding',
    '/me/system-health': 'System Health',
    '/me/projects': 'My Projects',
    '/me/directory': 'Contacts Directory',
    '/me/community/academy': 'Market Academy',
    '/me/community/roadmap': 'Roadmap',
    '/me/community/documentation': 'Documentation',
    '/me/community': 'Community Notes',
    '/me/resources/flows': 'Flow Library',
    '/me/resources': 'Resources',
    '/me/archive': 'Developer Archive',
    '/me/data-importer': 'Data Importer',
    '/me/tool/projects-finder': 'Market Library',
};

const getBreadcrumbName = (path: string) => {
    if (breadcrumbNameMap[path]) return breadcrumbNameMap[path];
    if (path.startsWith('/me/tool/')) {
        const toolId = path.split('/')[3];
        const tool = tools.find(t => t.id === toolId);
        return tool?.title || 'Tool';
    }
    const name = path.split('/').pop()?.replace(/-/g, ' ') || 'Page';
    return name.charAt(0).toUpperCase() + name.slice(1);
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ReactElement }
>(({ className, title, children, icon, ...props }, ref) => {
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
            <div className="flex items-center gap-x-2">
                <div className="p-1.5 bg-primary/10 text-primary rounded-md">
                    {React.cloneElement(icon, { className: 'h-4 w-4' })}
                </div>
                <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


export function DashboardHeader() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const pathname = usePathname();
  const { openTabs, activeTab, removeTab } = useTabManager();
  const pathSegments = pathname.split('/').filter(Boolean);
  const { user } = useAuth();
  
  const handleLogout = async () => {
    await auth?.signOut();
  }

  const toolCategories = React.useMemo(() => {
    const categories: Record<string, typeof tools> = {};
    tools.forEach(tool => {
        tool.categories.forEach(cat => {
            if (cat !== 'All') {
                if (!categories[cat]) categories[cat] = [];
                categories[cat].push(tool);
            }
        })
    });
    return categories;
  }, []);


  return (
    <header className="sticky top-0 z-30 flex h-auto flex-col border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
       <div className="flex h-14 items-center gap-4">
            <Link href="/me">
                <Logo />
            </Link>
          
          <NavigationMenu className="hidden md:flex ml-6">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/me" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Home
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                    <NavigationMenuTrigger>Apps</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2 lg:w-[700px] lg:grid-cols-3">
                            {Object.entries(toolCategories).map(([category, toolsInCategory]) => (
                                <li key={category}>
                                     <p className="px-3 py-2 text-sm font-semibold text-muted-foreground">{category}</p>
                                     <ul className="space-y-1">
                                      {toolsInCategory.slice(0, 4).map((tool) => (
                                        <ListItem key={tool.title} title={tool.title} href={tool.href} icon={tool.icon}>
                                            {tool.description}
                                        </ListItem>
                                      ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                         <div className="p-4 pt-0 text-center">
                            <Link href="/me/marketing">
                                <Button variant="outline" className="w-full">
                                    View All Apps
                                </Button>
                            </Link>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/me/flows" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Flows
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/me/community" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Community
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
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
