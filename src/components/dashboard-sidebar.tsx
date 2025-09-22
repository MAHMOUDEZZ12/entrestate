
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
        <Link
          href={link.href}
          className={cn(
            'flex h-10 items-center gap-3 justify-start rounded-lg px-3 text-muted-foreground transition-colors hover:text-foreground',
             isActive && 'bg-primary/10 text-primary'
          )}
        >
          {React.cloneElement(link.icon as React.ReactElement, { className: 'h-5 w-5' })}
          <span className="">{link.label}</span>
        </Link>
    );
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
            <Logo />
        </div>
      <nav className="flex flex-col gap-2 p-4">
        {mainNavLinks.map(renderLink)}
      </nav>
      <nav className="mt-auto flex flex-col gap-2 p-4">
        {secondaryNavLinks.map(renderLink)}
      </nav>
    </aside>
  );
}
