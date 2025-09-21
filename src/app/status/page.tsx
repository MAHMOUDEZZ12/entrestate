'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Server } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function StatusPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="System Status"
        description="Real-time status of all Entrestate services and AI models."
        icon={<Server className="h-8 w-8" />}
      />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <Card className="bg-card/80 backdrop-blur-lg text-center">
            <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold font-heading">All Systems Operational</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Our real-time status page is in development. In the meantime, all services are fully operational.
                </p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
