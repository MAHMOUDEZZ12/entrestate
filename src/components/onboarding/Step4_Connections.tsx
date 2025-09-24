
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ProviderTile } from '@/components/ui/provider-tile';
import type { OnboardingDraft } from '@/types';
import { track } from '@/lib/events';

interface Step4Props {
    draft: OnboardingDraft;
    updateDraft: (data: Partial<OnboardingDraft>) => void;
}

export function Step4_Connections({ draft, updateDraft }: Step4Props) {
    const updateConnection = (key: 'meta' | 'google', value: boolean) => {
        updateDraft({
            connections: {
                ...draft.connections,
                [key]: value
            }
        });
        track('onboarding_connect_toggled', { provider: key, selected: value });
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Connect Your Accounts</CardTitle>
                <CardDescription>Unlock powerful automations by securely connecting your external accounts. You can always manage these later in settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <ProviderTile 
                    name="Meta (Facebook & Instagram)" 
                    status={draft.connections?.meta ? 'connected' : 'connect'} 
                    onClick={() => updateConnection('meta', !draft.connections?.meta)} 
                />
                <ProviderTile 
                    name="Google (Gmail & YouTube)" 
                    status={draft.connections?.google ? 'connected' : 'connect'} 
                    onClick={() => updateConnection('google', !draft.connections?.google)} 
                />
                 <p className="text-xs text-muted-foreground pt-2">By connecting, you agree to grant Entrestate permission to access your accounts for the purposes of running campaigns and managing content. We never store your passwords.</p>
            </CardContent>
        </Card>
    );
}
