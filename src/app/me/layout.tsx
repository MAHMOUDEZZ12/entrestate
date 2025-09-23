
'use client';

import React from 'react';
import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardTabs } from '@/components/dashboard-tabs';
import { GlobalIntelligenceSidebar } from '@/components/global-intelligence-sidebar';

export default function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      <main className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_400px] bg-muted/20">
          <div className="flex flex-col">
            <DashboardTabs />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
          </div>
          <GlobalIntelligenceSidebar />
      </main>
    </div>
  );
}
