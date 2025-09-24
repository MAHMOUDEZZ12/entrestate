
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Toaster } from "@/components/ui/toaster";
import { CookieConsent } from '@/components/cookie-consent';
import { CreativeCanvas } from '@/components/creative-canvas';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { useAuth } from '@/hooks/useAuth';
import { DashboardHeader } from './dashboard-header';

export default function AppContentClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { loading } = useAuth();

  const isAppRoute = pathname?.startsWith('/me') || pathname?.startsWith('/gem');

  if (loading) {
    // You can return a global loader here if you prefer
    return null;
  }

  return (
    <>
      {isAppRoute ? <DashboardHeader /> : <LandingHeader />}
      {children}
      {!isAppRoute && <LandingFooter />}
      <Toaster />
      <CookieConsent />
      <CreativeCanvas />
    </>
  );
}
