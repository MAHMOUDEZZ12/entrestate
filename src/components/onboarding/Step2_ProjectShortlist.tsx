
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { ProjectCard } from '@/components/ui/project-card';
import type { OnboardingDraft, Project } from '@/types';
import { track } from '@/lib/events';

interface Step2Props {
    draft: OnboardingDraft;
    updateDraft: (data: Partial<OnboardingDraft>) => void;
}

export function Step2_ProjectShortlist({ draft, updateDraft }: Step2Props) {
    const [isLoading, setIsLoading] = useState(true);
    const [suggestedProjects, setSuggestedProjects] = useState<Project[]>([]);

    useEffect(() => {
        setIsLoading(true);
        const devQuery = draft.devFocus && draft.devFocus.length > 0 ? `devs=${draft.devFocus.join(',')}` : 'devs=Emaar,Damac';
        fetch(`/api/projects/suggest?${devQuery}&limit=6`)
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    setSuggestedProjects(data.data || []);
                    // Also store the fetched projects in the draft to save them later
                    updateDraft({ suggestedProjects: data.data || [] });
                }
            })
            .catch(err => console.error("Failed to fetch suggestions", err))
            .finally(() => setIsLoading(false));
    }, [draft.devFocus, updateDraft]);

    const toggleShortlist = (projectId: string) => {
        const currentShortlist = draft.shortlist || [];
        const newShortlist = currentShortlist.includes(projectId)
            ? currentShortlist.filter(id => id !== projectId)
            : [...currentShortlist, projectId];
        updateDraft({ shortlist: newShortlist });
        track('onboarding_project_shortlisted', { projectId, selected: !currentShortlist.includes(projectId) });
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Seed Your Project Library</CardTitle>
                <CardDescription>Based on your focus, here are some popular projects. Select a few to add to your workspace library to get started.</CardDescription>
            </CardHeader>
            <CardContent>
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
                                project={{ ...proj, badge: 'Suggested' }}
                                selectable
                                selected={draft.shortlist?.includes(proj.id)}
                                onToggle={() => toggleShortlist(proj.id)}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
