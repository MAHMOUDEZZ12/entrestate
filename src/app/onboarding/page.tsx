
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { track } from '@/lib/events';
import type { OnboardingDraft } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { saveUserData } from '@/services/database';
import { Progress } from '@/components/ui/progress';

import { Step1_MarketFocus } from '@/components/onboarding/Step1_MarketFocus';
import { Step2_ProjectShortlist } from '@/components/onboarding/Step2_ProjectShortlist';
import { Step3_BrandKit } from '@/components/onboarding/Step3_BrandKit';
import { Step4_Connections } from '@/components/onboarding/Step4_Connections';


const INITIAL_DRAFT: OnboardingDraft = {
    city: 'Dubai',
    country: 'UAE',
    devFocus: ['Emaar', 'Damac'],
    shortlist: [],
    brandKit: { logoUrl: null, colors: { primary: '#36454F', accent: '#98FF98' }, contact: { name: '', phone: '', email: '' } },
    connections: { 'meta': true, 'google': false },
};

const STEPS = [
    { id: 1, name: 'Market Focus' },
    { id: 2, name: 'Project Library' },
    { id: 3, name: 'Brand Kit' },
    { id: 4, name: 'Connections' },
];

function OnboardingComponent() {
    const router = useRouter();
    const { toast } = useToast();
    const { user } = useAuth();
    
    const [currentStep, setCurrentStep] = useState(1);
    const [isFinishing, setIsFinishing] = useState(false);
    const [draft, setDraft] = useState<OnboardingDraft>(INITIAL_DRAFT);
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const updateDraft = (data: Partial<OnboardingDraft>) => {
        setDraft(prev => ({ ...prev, ...data }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
    
    const finishOnboarding = async () => {
        if (!user) {
            toast({ title: "Please log in to continue", variant: "destructive" });
            router.push('/login');
            return;
        }
        setIsFinishing(true);
        track('onboarding_completed', {
            devFocus: draft.devFocus,
            shortlistCount: draft.shortlist?.length,
            brandKitProvided: !!draft.brandKit?.contact?.name,
            connections: draft.connections,
        });

        try {
            const idToken = await user.getIdToken();
            let finalLogoUrl = draft.brandKit?.logoUrl || null;

            if (logoFile) {
                toast({ title: 'Uploading logo...' });
                const urlResponse = await fetch('/api/user/knowledge-upload-url', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
                    body: JSON.stringify({ filename: logoFile.name, contentType: logoFile.type })
                });
                const { ok, data, error } = await urlResponse.json();
                if (!ok) throw new Error(error || 'Failed to get upload URL.');
                
                await fetch(data.uploadUrl, { method: 'PUT', body: logoFile, headers: { 'Content-Type': logoFile.type }});
                finalLogoUrl = data.fileUrl;
                toast({ title: 'Logo uploaded!' });
            }

            const userProfilePayload = {
                companyName: draft.brandKit?.contact?.name,
                brandKit: { ...draft.brandKit, logoUrl: finalLogoUrl },
                onboarding: {
                    city: draft.city,
                    country: draft.country,
                    devFocus: draft.devFocus,
                    connections: draft.connections,
                }
            };
            
            await saveUserData(user.uid, userProfilePayload);
            toast({ title: "Profile Saved!" });


            const shortlistedProjectObjects = draft.suggestedProjects || [];
            for (const project of shortlistedProjectObjects) {
                 const projectResponse = await fetch('/api/user/projects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}`},
                    body: JSON.stringify(project)
                });
                if (!projectResponse.ok) {
                    console.warn(`Failed to save project ${project.id}.`);
                }
            }
            if (shortlistedProjectObjects.length > 0) {
              toast({ title: `${shortlistedProjectObjects.length} projects added to library.`});
            }
            
            toast({ title: "Setup Complete!", description: "Welcome to your new workspace." });
            router.push('/me');

        } catch (error: any) {
            toast({ title: "Setup Failed", description: error.message, variant: "destructive"});
        } finally {
            setIsFinishing(false);
        }
    }

    const progressValue = (currentStep / STEPS.length) * 100;

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold font-heading tracking-tight">Workspace Setup</h1>
                <p className="text-lg text-muted-foreground mt-2">Let's configure your AI-powered workspace in a few quick steps.</p>
            </div>
            
            <div className="px-4">
                <Progress value={progressValue} className="mb-2" />
                <p className="text-sm text-muted-foreground text-center">Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].name}</p>
            </div>

            <div className="min-h-[450px]">
                {currentStep === 1 && <Step1_MarketFocus draft={draft} updateDraft={updateDraft} />}
                {currentStep === 2 && <Step2_ProjectShortlist draft={draft} updateDraft={updateDraft} />}
                {currentStep === 3 && <Step3_BrandKit draft={draft} updateDraft={updateDraft} onFileSelect={setLogoFile} />}
                {currentStep === 4 && <Step4_Connections draft={draft} updateDraft={updateDraft} />}
            </div>

            <div className="flex justify-between items-center pt-8">
                <div>
                  {currentStep > 1 && (
                      <Button variant="outline" onClick={prevStep} disabled={isFinishing}>
                          <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                  )}
                </div>
                <div>
                   {currentStep < STEPS.length ? (
                      <Button onClick={nextStep} disabled={isFinishing}>
                          Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                  ) : (
                      <Button size="lg" onClick={finishOnboarding} disabled={isFinishing}>
                        {isFinishing ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Check className="mr-2 h-4 w-4" />}
                        Finish Setup
                      </Button>
                  )}
                </div>
            </div>
        </div>
    );
}

const DynamicOnboardingComponent = dynamic(() => Promise.resolve(OnboardingComponent), {
  ssr: false,
  loading: () => <div className="flex h-full w-full items-center justify-center"><Loader2 className="animate-spin h-8 w-8" /></div>,
});


export default function OnboardingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                 <Suspense fallback={<div className="flex h-full w-full items-center justify-center"><Loader2 className="animate-spin h-8 w-8" /></div>}>
                    <DynamicOnboardingComponent />
                 </Suspense>
            </main>
        </div>
    )
}
