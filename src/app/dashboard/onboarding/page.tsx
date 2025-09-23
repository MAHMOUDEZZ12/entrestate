
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DeprecatedOnboardingPage() {
  return (
    <main className="p-4 md:p-10 text-center">
      <h1 className="text-2xl font-bold">This page has moved</h1>
      <p className="text-muted-foreground">The Onboarding flow is now at the root level.</p>
      <Link href="/onboarding">
        <Button className="mt-4">Go to Onboarding</Button>
      </Link>
    </main>
  );
}
