
import React from 'react';
import { DashboardHeader } from '@/components/dashboard-header';
import { TabProvider } from '@/context/TabManagerContext';
import { CreativeCanvas } from '@/components/creative-canvas';
import { CanvasProvider } from '@/context/CanvasContext';
import { DashboardFooter } from '@/components/dashboard-footer';

export default function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TabProvider>
      <CanvasProvider>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <DashboardHeader />
          <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
            {children}
          </main>
          <DashboardFooter />
          <CreativeCanvas />
        </div>
      </CanvasProvider>
    </TabProvider>
  );
}
