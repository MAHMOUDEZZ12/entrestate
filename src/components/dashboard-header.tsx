

'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, Package2 } from 'lucide-react';
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
import { tools } from '@/lib/tools-client';
import { DashboardSidebar } from './dashboard-sidebar';


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
  const pathSegments = pathname.split('/').filter(Boolean);


  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            {pathSegments.slice(1).map((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 2).join('/')}`;
                const isLast = index === pathSegments.length - 2;
                const name = getBreadcrumbName(href);
                return (
                    <React.Fragment key={href}>
                        <BreadcrumbSeparator />
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

      <div className="relative ml-auto flex-1 md:grow-0">
        <Button variant="outline" className="w-full justify-start text-muted-foreground md:w-[200px] lg:w-[336px]" onClick={() => setIsSearchOpen(true)}>
            <Search className="mr-2 h-4 w-4" />
            <span className="truncate">Search tools, projects...</span>
             <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
            </kbd>
        </Button>
        <GlobalSearch isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
      </div>
    </header>
  );
}

    

    