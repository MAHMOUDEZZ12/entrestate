
'use client';

import React from 'react';
import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardTabs } from '@/components/dashboard-tabs';

export default function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      <main className="flex-1 flex flex-col bg-muted/20">
          <DashboardTabs />
          <div className="flex-1 overflow-y-auto">
              {children}
          </div>
      </main>
    </div>
  );
}
