
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Wallet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function PricingPage() {

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Pricing"
        description="This page is being updated with new packages. Please check back soon."
        icon={<Wallet className="h-8 w-8" />}
      />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <Card className="bg-card/80 backdrop-blur-lg text-center">
            <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold font-heading">New Packages Coming Soon</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    We're currently redesigning our pricing structure to better suit your needs.
                </p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}

    