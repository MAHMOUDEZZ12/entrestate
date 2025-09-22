
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
  Building,
  Target,
  Users,
  BookOpen,
  School
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

const mainNavLinks = [
  { href: '/dashboard', icon: <Home className="h-5 w-5" />, label: 'Home' },
  { href: '/dashboard/marketing', icon: <LayoutGrid className="h-5 w-5" />, label: 'Apps' },
  { href: '/dashboard/flows', icon: <Workflow className="h-5 w-5" />, label: 'Flows' },
  { href: '/dashboard/brand', icon: <Palette className="h-5 w-5" />, label: 'Brand & Assets' },
  { href: '/dashboard/assistant', icon: <Bot className="h-5 w-5" />, label: 'AI Assistant' },
  { href: '/dashboard/tool/projects-finder', icon: <Database className="h-5 w-5" />, label: 'Market Library' },
  { href: '/dashboard/leads', icon: <Target className="h-5 w-5" />, label: 'Leads & CRM' },
  { href: '/dashboard/directory', icon: <Users className="h-5 w-5" />, label: 'Contacts Directory' },
];

const secondaryNavLinks = [
    { href: '/community/academy', icon: <School className="h-5 w-5" />, label: 'Academy' },
    { href: '/resources', icon: <BookOpen className="h-5 w-5" />, label: 'Resources' },
    { href: '/dashboard/system-health', icon: <HeartPulse className="h-5 w-5" />, label: 'System Health' },
    { href: '/dashboard/settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' }
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const renderLink = (link: { href: string; icon: React.ReactNode; label: string; }) => {
    const isActive = pathname === link.href;
    return (
        <Link
          key={link.href}
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
            <Link href="/dashboard">
                <Logo />
            </Link>
        </div>
      <nav className="flex flex-col gap-1 p-3">
        {mainNavLinks.map(renderLink)}
      </nav>
      <nav className="mt-auto flex flex-col gap-1 p-3">
        {secondaryNavLinks.map(renderLink)}
      </nav>
    </aside>
  );
}
