
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2, Video, Upload, Mic, User } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { useToast } from '@/hooks/use-toast';
import { fileToDataUri } from '@/lib/tools-client';
import { generateVideoPresenter } from '@/ai/flows/archy/generate-video-presenter';
import type { GenerateVideoPresenterInput, GenerateVideoPresenterOutput } from '@/types';

export default function AiVideoPresenterPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GenerateVideoPresenterOutput | null>(null);

    const [presenterImage, setPresenterImage] = useState<File | null>(null);
    const [presenterImageUri, setPresenterImageUri] = useState<string | null>(null);
    const [characterDescription, setCharacterDescription] = useState('');
    const [script, setScript] = useState('');

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPresenterImage(file);
            const uri = await fileToDataUri(file);
            setPresenterImageUri(uri);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!script) {
            toast({ title: "Script is required", description: "Please enter the script for the presenter to speak.", variant: "destructive" });
            return;
        }
        if (!presenterImageUri && !characterDescription) {
            toast({ title: "Character required", description: "Please upload your photo or describe a character.", variant: "destructive" });
            return;
        }
        setIsLoading(true);
        setResult(null);

        try {
            const payload: GenerateVideoPresenterInput = {
                script,
                characterImageUri: presenterImageUri || undefined,
                characterDescription: presenterImageUri ? undefined : characterDescription,
            };
            const response = await generateVideoPresenter(payload);
            setResult(response);
            toast({ title: "Video Generated!", description: "Your AI Presenter video is ready." });
        } catch (error: any) {
            toast({ title: "Generation Failed", description: error.message, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="AI Video Presenter"
                description="Create a digital twin to deliver your pitches. Upload your photo or describe a character, provide a script, and let the AI do the rest."
                icon={<Video className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Create Your Presenter</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="photo-upload">1. Upload Your Photo (Optional)</Label>
                                <Input id="photo-upload" type="file" accept="image/*" onChange={handleFileChange} />
                                <p className="text-xs text-muted-foreground">For best results, use a clear, front-facing headshot. This creates your "Digital Twin".</p>
                            </div>

                             {presenterImageUri && (
                                <div className="p-2 border rounded-md w-fit">
                                    <img src={presenterImageUri} alt="Presenter preview" className="h-24 w-24 object-cover rounded" />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="character-desc">Or Describe a Character</Label>
                                <Input id="character-desc" placeholder="e.g., 'professional real estate agent, friendly smile'" value={characterDescription} onChange={e => setCharacterDescription(e.target.value)} disabled={!!presenterImageUri} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="script">2. Provide the Script</Label>
                                <Textarea id="script" placeholder="Enter the text you want the presenter to speak..." value={script} onChange={e => setScript(e.target.value)} rows={8} required />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                {isLoading ? 'Generating Video...' : 'Generate Presenter Video'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Generated Video</CardTitle>
                        <CardDescription>Your final video will appear here.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center min-h-[300px] bg-muted/50 rounded-lg">
                        {isLoading ? (
                            <div className="text-center text-muted-foreground">
                                <Loader2 className="h-10 w-10 animate-spin text-primary mb-2 mx-auto" />
                                <p>Generating... this can take a minute.</p>
                            </div>
                        ) : result ? (
                            <div className="space-y-4 w-full">
                                <video src={result.videoUrl} controls className="w-full rounded-lg border bg-black" />
                                <audio src={result.audioDataUri} controls className="w-full" />
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground">
                                <User className="h-12 w-12 mx-auto mb-2" />
                                <p>Awaiting instructions</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
