
'use client';

import React from 'react';
import { GanttChartSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';

export default function DeprecatedDevAdminPage() {
  return (
    <main className="p-4 md:p-10 space-y-8">
       <PageHeader
        title="This page has moved"
        description="The Developer Admin dashboard is now located at the top-level /gem route."
        icon={<GanttChartSquare className="h-8 w-8" />}
      >
        <Link href="/gem">
            <Button>Go to Developer Dashboard</Button>
        </Link>
      </PageHeader>
    </main>
  );
}
