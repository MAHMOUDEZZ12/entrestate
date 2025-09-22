
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Home,
  Settings,
  Package,
  Users2,
  LineChart,
  Package2,
  MessageCircle,
  Palette,
  LayoutGrid,
  Bot,
  Database,
  HeartPulse,
  Workflow,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

const mainNavLinks = [
  { href: '/dashboard', icon: <Home className="h-5 w-5" />, label: 'Home' },
  { href: '/dashboard/marketing', icon: <LayoutGrid className="h-5 w-5" />, label: 'Apps' },
  { href: '/dashboard/flows', icon: <Workflow className="h-5 w-5" />, label: 'Flows' },
  { href: '/dashboard/brand', icon: <Palette className="h-5 w-5" />, label: 'Brand & Assets' },
  { href: '/dashboard/assistant', icon: <Bot className="h-5 w-5" />, label: 'AI Assistant' },
];

const secondaryNavLinks = [
    { href: '/dashboard/system-health', icon: <HeartPulse className="h-5 w-5" />, label: 'System Health' },
    { href: '/dashboard/settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' }
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const renderLink = (link: { href: string; icon: React.ReactNode; label: string; }) => {
    const isActive = pathname.startsWith(link.href) && (link.href !== '/dashboard' || pathname === '/dashboard');
    return (
      <TooltipProvider key={link.href}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={link.href}
              className={cn(
                'relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              )}
            >
              {isActive && (
                <span className="absolute left-0 h-6 w-1 rounded-r-full bg-primary" />
              )}
              {link.icon}
              <span className="sr-only">{link.label}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{link.label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Entrestate</span>
        </Link>
        {mainNavLinks.map(renderLink)}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        {secondaryNavLinks.map(renderLink)}
      </nav>
    </aside>
  );
}

    