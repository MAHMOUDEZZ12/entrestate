
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function DeprecatedProjectsPage() {
  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="My Projects (Deprecated)"
        description="This page has been replaced by the Market Library tool."
        icon={<PlusCircle className="h-8 w-8" />}
      />
      <Alert>
        <AlertTitle>This Page is No Longer in Use</AlertTitle>
        <AlertDescription>
            Project management has been upgraded. Please use the unified{' '}
            <Link href="/dashboard/tool/projects-finder" className="font-semibold underline">
                Market Library
            </Link>
            {' '}tool to search for public projects or add your own private ones.
        </AlertDescription>
      </Alert>
    </main>
  );
}
