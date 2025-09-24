'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/app/landing-footer';

export default function AppContentClient({ children }: { children: React.ReactNode }) {

  return (
    <>
      <LandingHeader />
      {children}
      <LandingFooter />
    </>
  );
}
