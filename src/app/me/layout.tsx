
import React from 'react';
import { DashboardFooter } from '@/components/dashboard-footer';
import { LandingHeader } from '@/components/landing-header';

export default function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
        <LandingHeader />
        <main className="flex-1">
          {children}
        </main>
        <DashboardFooter />
    </div>
  );
}
