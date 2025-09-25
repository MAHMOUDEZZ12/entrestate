
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Compass,
  Workflow,
  FolderCog,
  Library,
  Users2,
  Settings,
  Bot,
  Building,
  UserPlus
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const sidebarLinks = [
  { href: '/me/workspace', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/me/marketing', label: 'Marketplace', icon: <Compass /> },
  { href: '/me/flows', label: 'Flow Builder', icon: <Workflow /> },
  { href: '/me/brand', label: 'Brand & Assets', icon: <FolderCog /> },
  { href: '/me/tool/projects-finder', label: 'Market Library', icon: <Building /> },
  { href: '/me/leads', label: 'Leads (CRM)', icon: <UserPlus /> },
];

const bottomLinks = [
  { href: '/me/assistant', label: 'AI Assistant', icon: <Bot /> },
  { href: '/me/settings', label: 'Settings', icon: <Settings /> },
];

export function WorkspaceSidebar() {
  const pathname = usePathname();

  const NavLink = ({ href, label, icon }: { href: string, label: string, icon: React.ReactNode }) => {
    const isActive = pathname.startsWith(href) && (href !== '/me/workspace' || pathname === '/me/workspace');
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={href}>
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted",
                  isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground"
                )}
              >
                {icon}
                <span className="sr-only">{label}</span>
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <aside className="hidden border-r bg-background sm:flex z-20">
      <div className="flex h-full max-h-screen flex-col gap-4 p-3">
        <nav className="flex flex-col items-center gap-3">
          {sidebarLinks.map(link => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-3">
          {bottomLinks.map(link => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
