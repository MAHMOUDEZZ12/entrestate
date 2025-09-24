

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Settings,
  LayoutGrid,
  Bot,
  Palette,
  Database,
  Workflow,
  Target,
  Users,
  BookOpen,
  School,
  Brain,
  Library,
  Store,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

const mainNavLinks = [
  { href: '/me', icon: <Home className="h-5 w-5" />, label: 'Home' },
  { href: '/me/marketing', icon: <Store className="h-5 w-5" />, label: 'Marketplace' },
  { href: '/me/tool/prompt-library', icon: <Library className="h-5 w-5" />, label: 'Prompt Library' },
  { href: '/me/flows', icon: <Workflow className="h-5 w-5" />, label: 'Flows' },
  { href: '/me/brand', icon: <Palette className="h-5 w-5" />, label: 'Brand & Assets' },
  { href: '/me/assistant', icon: <Bot className="h-5 w-5" />, label: 'AI Assistant' },
  { href: '/me/tool/projects-finder', icon: <Database className="h-5 w-5" />, label: 'Market Library' },
  { href: '/me/leads', icon: <Target className="h-5 w-5" />, label: 'Leads (CRM)' },
  { href: '/me/directory', icon: <Users className="h-5 w-5" />, label: 'Contacts Directory' },
];

const secondaryNavLinks = [
    { href: '/me/community/academy', icon: <School className="h-5 w-5" />, label: 'Market Academy' },
    { href: '/resources/flows', icon: <BookOpen className="h-5 w-5" />, label: 'Resources' },
    { href: '/me/tool/superfreetime', icon: <Brain className="h-5 w-5" />, label: 'Market Memory' },
    { href: '/me/settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' }
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
            <Logo href="/me" />
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
