
'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import type { OnboardingDraft } from '@/types';

interface Step3Props {
    draft: OnboardingDraft;
    updateDraft: (data: Partial<OnboardingDraft>) => void;
    onFileSelect: (file: File | null) => void;
}

export function Step3_BrandKit({ draft, updateDraft, onFileSelect }: Step3Props) {
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const handleFileChange = (files: FileList | null) => {
        const file = files?.[0];
        if (file) {
            onFileSelect(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setLogoPreview(result);
            };
            reader.readAsDataURL(file);
        } else {
            onFileSelect(null);
            setLogoPreview(null);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Define Your Brand</CardTitle>
                <CardDescription>Provide your logo and contact info. The AI will use these to personalize all generated content, from brochures to ad campaigns.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label>Company Logo</Label>
                        <div className="relative flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:border-primary transition-colors">
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
                    <div className="md:col-span-2 space-y-4">
                        <div className="space-y-2">
                            <Label>Your Name / Company Name</Label>
                            <Input 
                                value={draft.brandKit?.contact?.name} 
                                onChange={(e) => updateDraft({ brandKit: {...draft.brandKit!, contact: {...draft.brandKit!.contact, name: e.target.value}}})} 
                                placeholder="e.g., John Doe" />
                        </div>
                         <div className="space-y-2">
                            <Label>Your Email</Label>
                            <Input 
                                value={draft.brandKit?.contact?.email} 
                                type="email"
                                onChange={(e) => updateDraft({ brandKit: {...draft.brandKit!, contact: {...draft.brandKit!.contact, email: e.target.value}}})} 
                                placeholder="e.g., john.doe@example.com" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
