'use client';

import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { GlobalChat } from '@/components/global-chat';
import { cn } from '@/lib/utils';
import { SpotlightProvider } from '@/context/SpotlightContext';

export default function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isBarOnTop, setIsBarOnTop] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
        const savedValue = localStorage.getItem('isAnalogBarOnTop');
        setIsBarOnTop(savedValue === 'true');
    } catch (e) {
        // localStorage not available
    }
  }, []);


  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardSidebar />
      <div className="flex flex-col sm:pl-60">
        <DashboardHeader />
        <div className={cn("flex flex-col flex-1", isBarOnTop && "flex-col-reverse")}>
          <main className="flex-1 overflow-y-auto pb-24 pt-0">
            {children}
          </main>
          {isClient && <GlobalChat />}
        </div>
      </div>
    </div>
  );
}
