
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTabManager } from '@/context/TabManagerContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function DashboardTabs() {
  const { openTabs, activeTab, removeTab } = useTabManager();
  const pathname = usePathname();

  // Don't render tabs on non-dashboard pages
  if (!pathname.startsWith('/me')) {
      return null;
  }

  const handleCloseTab = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    removeTab(href);
  };

  return (
    <div className="border-b bg-background">
      <nav className="px-4 md:px-6 flex items-center gap-1 -mb-px overflow-x-auto">
        {openTabs.map((tab) => {
            const isActive = tab.href === activeTab?.href;
            return (
              <Link href={tab.href} key={tab.href} passHref legacyBehavior>
                <a
                  className={cn(
                    'flex-shrink-0 flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2',
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span>{tab.label}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 rounded-full"
                    onClick={(e) => handleCloseTab(e, tab.href)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </a>
              </Link>
            )
        })}
      </nav>
    </div>
  );
}
