'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DeprecatedAcademyPage() {
  return (
    <main className="p-4 md:p-10 text-center">
      <h1 className="text-2xl font-bold">This page has moved</h1>
      <p className="text-muted-foreground">The Academy page is now part of the new authenticated experience.</p>
      <Link href="/me/community/academy">
        <Button className="mt-4">Go to Academy</Button>
      </Link>
    </main>
  );
}
