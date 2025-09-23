
'use client';

import React from 'react';
import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardTabs } from '@/components/dashboard-tabs';
import { GlobalChat } from '@/components/global-chat';

export default function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      <div className="flex flex-col flex-1">
        <DashboardTabs />
        <main className="flex-1 overflow-y-auto pb-24">
            {children}
        </main>
      </div>
      <GlobalChat />
    </div>
  );
}
