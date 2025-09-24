
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { OnboardingDraft } from '@/types';
import { track } from '@/lib/events';

const MOCK_DEVELOPERS = ['Emaar', 'Damac', 'Sobha', 'Nakheel', 'Meraas', 'Aldar'];

interface Step1Props {
    draft: OnboardingDraft;
    updateDraft: (data: Partial<OnboardingDraft>) => void;
}

export function Step1_MarketFocus({ draft, updateDraft }: Step1Props) {
    const toggleDeveloper = (dev: string) => {
        const currentDevs = draft.devFocus || [];
        const newDevs = currentDevs.includes(dev)
            ? currentDevs.filter(d => d !== dev)
            : [...currentDevs, dev];
        updateDraft({ devFocus: newDevs });
        track('onboarding_developer_toggled', { developer: dev, selected: !currentDevs.includes(dev) });
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Market Focus</CardTitle>
                <CardDescription>Select the developers you work with most. This will help the AI prioritize relevant projects and market data for you.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-3">
                    {MOCK_DEVELOPERS.map(dev => (
                        <button key={dev}
                            onClick={() => toggleDeveloper(dev)}
                            aria-pressed={draft.devFocus?.includes(dev)}
                            className={cn(
                                "rounded-full border-2 px-4 py-2 text-md font-semibold transition-colors duration-200", 
                                draft.devFocus?.includes(dev) 
                                    ? 'border-primary bg-primary/20 text-primary' 
                                    : 'border-border hover:bg-muted/50'
                            )}
                        >
                            {dev}
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
