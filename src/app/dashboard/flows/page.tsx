
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DeprecatedFlowsPage() {
  return (
    <main className="p-4 md:p-10 text-center">
      <h1 className="text-2xl font-bold">This page has moved</h1>
      <p className="text-muted-foreground">The Flow Builder is now part of the new authenticated experience.</p>
      <Link href="/me/flows">
        <Button className="mt-4">Go to Flow Builder</Button>
      </Link>
    </main>
  );
}
    
