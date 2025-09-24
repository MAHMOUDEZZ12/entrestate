
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/app/landing-footer';

export default function AppContentClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = pathname?.startsWith('/me') || pathname?.startsWith('/gem');

  // The main layout now handles the workspace header if it's an app route.
  // This component will only render the public-facing header/footer.
  return (
    <>
      {!isAppRoute && <LandingHeader />}
      {children}
      {!isApprehensive && <LandingFooter />}
    </>
  );
}
