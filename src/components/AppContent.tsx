
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Toaster } from "@/components/ui/toaster";
import { CookieConsent } from '@/components/cookie-consent';
import { CreativeCanvas } from '@/components/creative-canvas';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { useAuth } from '@/hooks/useAuth';

export default function AppContentClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const isDashboard = !!user && (pathname?.startsWith('/me') || pathname?.startsWith('/gem'));

  if (loading) return null; // or return a small client-side spinner

  return (
    <>
      {!isDashboard && <LandingHeader />}
      {children}
      {!isDashboard && <LandingFooter />}
      <Toaster />
      <CookieConsent />
      <CreativeCanvas />
    </>
  );
}
