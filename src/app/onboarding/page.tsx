
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ProjectCard } from '@/components/ui/project-card';
import { ProviderTile } from '@/components/ui/provider-tile';
import { Check, ChevronRight, X, ArrowLeft, Loader2, Sparkles, Upload, Users2, Building, Palette, Network } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { track } from '@/lib/events';
import type { Project, OnboardingDraft } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { saveUserData } from '@/services/database';
import Link from 'next/link';

const MOCK_DEVELOPERS = ['Emaar', 'Damac', 'Sobha', 'Nakheel', 'Meraas', 'Aldar'];

const INITIAL_DRAFT: OnboardingDraft = {
    city: 'Dubai',
    country: 'UAE',
    devFocus: ['Emaar', 'Damac'],
    shortlist: [],
    brandKit: { logoUrl: null, colors: { primary: '#36454F', accent: '#98FF98' }, contact: { name: '', phone: '', email: '' } },
    connections: { 'meta': true, 'google': false },
};

function OnboardingComponent() {
    const router = useRouter();
    const { toast } = useToast();
    const { user } = useAuth();
    
    const [isLoading, setIsLoading] = useState(false);
    const [isFinishing, setIsFinishing] = useState(false);
    const [suggestedProjects, setSuggestedProjects] = useState<Project[]>([]);
    const [draft, setDraft] = useState<OnboardingDraft>(INITIAL_DRAFT);
    const [logoPreview, setLogoPreview] = React.useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        const devQuery = draft.devFocus && draft.devFocus.length > 0 ? `devs=${draft.devFocus.join(',')}` : 'devs=Emaar,Damac';
        fetch(`/api/projects/suggest?${devQuery}&limit=6`)
            .then(res => res.json())
            .then(data => {
                if (data.ok) setSuggestedProjects(data.data || []);
            })
            .catch(err => console.error("Failed to fetch suggestions", err))
            .finally(() => setIsLoading(false));
    }, [draft.devFocus]);

    const updateDraft = (data: Partial<OnboardingDraft>) => {
        setDraft(prev => ({ ...prev, ...data }));
    };
    
    const updateConnection = (key: 'meta' | 'google', value: boolean) => {
        setDraft(prev => ({
            ...prev,
            connections: {
                ...prev.connections,
                [key]: value
            }
        }));
         track('onboarding_connect_toggled', { provider: key, selected: value });
    }

    const handleFileChange = (files: FileList | null) => {
        const file = files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            setLogoPreview(result);
            updateDraft({ brandKit: { ...draft.brandKit!, logoUrl: result }});
          };
          reader.readAsDataURL(file);
        }
    };

    const toggleDeveloper = (dev: string) => {
        const currentDevs = draft.devFocus || [];
        const newDevs = currentDevs.includes(dev)
            ? currentDevs.filter(d => d !== dev)
            : [...currentDevs, dev];
        updateDraft({ devFocus: newDevs });
        track('onboarding_developer_toggled', { developer: dev, selected: !currentDevs.includes(dev) });
    };

    const toggleShortlist = (projectId: string) => {
        const currentShortlist = draft.shortlist || [];
        const newShortlist = currentShortlist.includes(projectId)
            ? currentShortlist.filter(id => id !== projectId)
            : [...currentShortlist, projectId];
        updateDraft({ shortlist: newShortlist });
         track('onboarding_project_shortlisted', { projectId, selected: !currentShortlist.includes(projectId) });
    }

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

            // 1. Save user profile data
            const userProfilePayload = {
                companyName: draft.brandKit?.contact?.name,
                brandKit: draft.brandKit,
                onboarding: {
                    city: draft.city,
                    country: draft.country,
                    devFocus: draft.devFocus,
                    connections: draft.connections,
                }
            };

            const profileResponse = await fetch('/api/user/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}`},
                body: JSON.stringify(userProfilePayload)
            });

            if (!profileResponse.ok) {
                const errorData = await profileResponse.json();
                throw new Error(errorData.error || "Failed to save user profile.");
            }


            // 2. Save shortlisted projects to user's library
            const shortlistedProjectObjects = suggestedProjects.filter(p => draft.shortlist?.includes(p.id));
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
            
            toast({ title: "Setup Complete!", description: "Welcome to your new workspace." });
            router.push('/me');

        } catch (error: any) {
            toast({ title: "Setup Failed", description: error.message, variant: "destructive"});
        } finally {
            setIsFinishing(false);
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold font-heading tracking-tight">Welcome to Entrestate</h1>
                <p className="text-lg text-muted-foreground mt-2">Let's set up your AI-powered workspace in one go.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Building className="h-5 w-5 text-primary" /> Market Focus & Project Library</CardTitle>
                            <CardDescription>Select developers to seed your project library. The AI will learn your preferences.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="mb-6">
                                <h3 className="font-semibold mb-2">Key Developers</h3>
                                <div className="flex flex-wrap gap-2">
                                    {MOCK_DEVELOPERS.map(dev => (
                                        <button key={dev}
                                            onClick={() => toggleDeveloper(dev)}
                                            aria-pressed={draft.devFocus?.includes(dev)}
                                            className={cn("rounded-full border px-3 py-1 text-sm transition-colors", draft.devFocus?.includes(dev) ? 'border-primary bg-primary/20 text-primary' : 'border-border hover:bg-muted/50')}>
                                            {dev}
                                        </button>
                                    ))}
                                </div>
                            </div>
                             <div>
                                <h3 className="font-semibold mb-2">Suggested Projects</h3>
                                {isLoading ? (
                                     <div className="flex items-center justify-center h-48 text-muted-foreground">
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        <span>Finding relevant projects...</span>
                                     </div>
                                ) : (
                                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {suggestedProjects.map((proj: Project) => (
                                            <ProjectCard 
                                                key={proj.id} 
                                                project={{...proj, badge: 'Suggested'}}
                                                selectable
                                                selected={draft.shortlist?.includes(proj.id)}
                                                onToggle={() => toggleShortlist(proj.id)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-8 lg:sticky top-24">
                     <Card>
                        <CardHeader>
                           <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-primary" /> Your Brand Kit</CardTitle>
                           <CardDescription>Add your brand to personalize all AI-generated content.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label>Company Logo</Label>
                                <div className="relative flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:border-primary transition-colors">
                                   <Input id="logo" type="file" accept="image/*" className="sr-only" onChange={(e) => handleFileChange(e.target.files)} />
                                   <label htmlFor="logo" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                     {logoPreview ? (
                                        <Image src={logoPreview} alt="Logo preview" fill={true} className="object-contain rounded-md p-2" />
                                     ) : (
                                       <div className="text-center text-muted-foreground">
                                         <Upload className="mx-auto h-6 w-6 mb-1" />
                                         <p className="text-xs">Upload</p>
                                       </div>
                                     )}
                                   </label>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Your Name / Company</Label>
                                <Input value={draft.brandKit?.contact?.name} onChange={(e) => updateDraft({ brandKit: {...draft.brandKit!, contact: {...draft.brandKit!.contact, name: e.target.value}}})} placeholder="e.g., John Doe" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                             <CardTitle className="flex items-center gap-2"><Network className="h-5 w-5 text-primary" /> Connections</CardTitle>
                             <CardDescription>Unlock automations by connecting external accounts.</CardDescription>
                        </CardHeader>
                         <CardContent className="space-y-2">
                            <ProviderTile name="Meta (Facebook & Instagram)" status={draft.connections?.meta ? 'connected' : 'connect'} onClick={() => updateConnection('meta', !draft.connections?.meta)} />
                            <ProviderTile name="Google (Gmail & YouTube)" status={draft.connections?.google ? 'connected' : 'connect'} onClick={() => updateConnection('google', !draft.connections?.google)} />
                         </CardContent>
                    </Card>
                </div>
            </div>

            <div className="text-center pt-8">
                <Button size="lg" onClick={finishOnboarding} disabled={isFinishing}>
                    {isFinishing ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4" />}
                    Finish Setup & Go to Dashboard
                </Button>
            </div>
        </div>
    );
}

export default function OnboardingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                 <Suspense fallback={<div className="flex h-full w-full items-center justify-center"><Loader2 className="animate-spin h-8 w-8" /></div>}>
                    <OnboardingComponent />
                 </Suspense>
            </main>
        </div>
    )
}
