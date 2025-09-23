
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DeprecatedClientsPage() {
  return (
    <main className="p-4 md:p-10 text-center">
      <h1 className="text-2xl font-bold">This page has moved</h1>
      <p className="text-muted-foreground">The Clients page is now part of the new authenticated experience.</p>
      <Link href="/me/clients">
        <Button className="mt-4">Go to Clients Page</Button>
      </Link>
    </main>
  );
}
