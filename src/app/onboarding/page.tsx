'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function OnboardingPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Welcome to WhatsMAP"
        description="Let's get your AI co-pilot set up for success. (Coming Soon)"
        icon={<Sparkles className="h-8 w-8" />}
      />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <Card className="bg-card/80 backdrop-blur-lg text-center">
            <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold font-heading">Onboarding Experience in Development</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    We are building a guided setup experience to help you train your AI and connect your accounts.
                </p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
