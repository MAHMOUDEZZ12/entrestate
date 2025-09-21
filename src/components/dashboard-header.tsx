
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search } from 'lucide-react';
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


const breadcrumbNameMap: { [key: string]: string } = {
    '/dashboard': 'Home',
    '/dashboard/marketing': 'Apps',
    '/dashboard/brand': 'Brand & Assets',
    '/dashboard/assistant': 'AI Command Center',
    '/dashboard/settings': 'Settings',
    '/dashboard/dev-admin': 'Developer Admin'
};

const getBreadcrumbName = (path: string) => {
    if (breadcrumbNameMap[path]) return breadcrumbNameMap[path];
    if (path.startsWith('/dashboard/tool/')) {
        const toolId = path.split('/')[3];
        const tool = tools.find(t => t.id === toolId);
        return tool?.title || 'Tool';
    }
    return path.split('/').pop()?.replace(/-/g, ' ') || 'Page';
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
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/dashboard" className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">WhatsMAP</span>
            </Link>
            <Link href="/dashboard" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">Home</Link>
            <Link href="/dashboard/marketing" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">Apps</Link>
            <Link href="/dashboard/brand" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">Brand & Assets</Link>
            <Link href="/dashboard/assistant" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">AI Assistant</Link>
            <Link href="/dashboard/settings" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">Settings</Link>
          </nav>
        </SheetContent>
      </Sheet>
      
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            {pathSegments.map((segment, index) => {
                if (segment === 'dashboard') return null;
                const href = `/${pathSegments.slice(0, index + 2).join('/')}`;
                const isLast = index === pathSegments.length - 2;
                return (
                    <React.Fragment key={href}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {isLast ? (
                                <BreadcrumbPage>{getBreadcrumbName(href)}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link href={href}>{getBreadcrumbName(href)}</Link>
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
