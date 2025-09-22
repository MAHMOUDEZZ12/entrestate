

import React from 'react';
import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { TabProvider } from '@/context/TabManagerContext';
import { CreativeCanvas } from '@/components/creative-canvas';
import { CanvasProvider } from '@/context/CanvasContext';
import { DashboardFooter } from '@/components/dashboard-footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TabProvider>
      <CanvasProvider>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <DashboardSidebar />
          <div className="flex flex-col sm:pl-60">
            <DashboardHeader />
            <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
              {children}
            </main>
            <DashboardFooter />
          </div>
          <CreativeCanvas />
        </div>
      </CanvasProvider>
    </TabProvider>
  );
}

    