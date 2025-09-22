
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, BookOpen, GitBranch, Users2, Workflow, School, X } from 'lucide-react';
import React from 'react';
import { GlobalSearch } from '@/components/ui/global-search';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation';
import { tools } from '@/lib/tools-client';
import { DashboardSidebar } from './dashboard-sidebar';
import { useTabManager } from '@/context/TabManagerContext';
import { cn } from '@/lib/utils';


const breadcrumbNameMap: { [key: string]: string } = {
    '/dashboard': 'Home',
    '/dashboard/marketing': 'Apps',
    '/dashboard/brand': 'Brand & Assets',
    '/dashboard/assistant': 'AI Command Center',
    '/dashboard/settings': 'Settings',
    '/dashboard/dev-admin': 'Developer Admin',
    '/dashboard/flows': 'Flow Builder',
    '/dashboard/clients': 'Client Pages',
    '/dashboard/leads': 'Leads (CRM)',
    '/dashboard/onboarding': 'Onboarding',
    '/dashboard/system-health': 'System Health',
    '/dashboard/projects': 'My Projects',
    '/dashboard/directory': 'Contacts Directory',
    '/community/academy': 'Market Academy',
    '/community/roadmap': 'Roadmap',
    '/community/documentation': 'Documentation',
    '/community': 'Community Notes',
    '/resources/flows': 'Flow Library',
    '/resources': 'Resources',
    '/dashboard/archive': 'Developer Archive',
    '/dashboard/data-importer': 'Data Importer',
    '/dashboard/tool/projects-finder': 'Market Library',
};

const getBreadcrumbName = (path: string) => {
    if (breadcrumbNameMap[path]) return breadcrumbNameMap[path];
    if (path.startsWith('/dashboard/tool/')) {
        const toolId = path.split('/')[3];
        const tool = tools.find(t => t.id === toolId);
        return tool?.title || 'Tool';
    }
    const name = path.split('/').pop()?.replace(/-/g, ' ') || 'Page';
    return name.charAt(0).toUpperCase() + name.slice(1);
}


export function DashboardHeader() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const pathname = usePathname();
  const { openTabs, activeTab, removeTab } = useTabManager();
  const pathSegments = pathname.split('/').filter(Boolean);


  return (
    <header className="sticky top-0 z-30 flex h-auto flex-col border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
       <div className="flex h-14 items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs p-0">
              <DashboardSidebar />
            </SheetContent>
          </Sheet>
          
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathSegments.length - 1;
                    const name = getBreadcrumbName(href);
                    return (
                        <React.Fragment key={href}>
                            {index > 0 && <BreadcrumbSeparator />}
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage className="capitalize">{name}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={href} className="capitalize">{name}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
          </Breadcrumb>
          
           <div className="ml-auto flex items-center gap-2">
                <nav className="hidden md:flex items-center gap-1">
                    <Link href="/resources/flows"><Button variant="ghost" size="sm"><BookOpen className="h-4 w-4 mr-1"/> Resources</Button></Link>
                    <Link href="/community"><Button variant="ghost" size="sm"><Users2 className="h-4 w-4 mr-1"/> Community</Button></Link>
                </nav>
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
