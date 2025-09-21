
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, Mic } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ugcScriptWriter } from '@/ai/flows/archy/ugc-script-writer';
import type { UgcScriptWriterInput, UgcScriptWriterOutput } from '@/ai/flows/archy/ugc-script-writer';

export default function UgcScriptWriterPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<UgcScriptWriterOutput | null>(null);

    const [topic, setTopic] = useState('');
    const [vibe, setVibe] = useState('Authentic & Relatable');
    const [hookStyle, setHookStyle] = useState('Problem/Solution');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic) {
            toast({ title: "Topic is required", description: "Please enter a topic for the script.", variant: "destructive" });
            return;
        }
        setIsLoading(true);
        setResult(null);

        try {
            const payload: UgcScriptWriterInput = { topic, vibe, hookStyle };
            const response = await ugcScriptWriter(payload);
            setResult(response);
            toast({ title: "Scripts Generated!", description: "Your new UGC-style scripts are ready." });
        } catch (error: any) {
            toast({ title: "Generation Failed", description: error.message, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="UGC Script Writer"
                description="Generate authentic, conversational video scripts optimized for social media engagement."
                icon={<Mic className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <Card className="lg:col-span-1 sticky top-24">
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Script Generator</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="topic">Topic</Label>
                                <Input id="topic" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., 'Emaar Beachfront 2BR Apartment'" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="vibe">Vibe</Label>
                                <Select value={vibe} onValueChange={setVibe}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Exciting & Upbeat">Exciting & Upbeat</SelectItem>
                                        <SelectItem value="Authentic & Relatable">Authentic & Relatable</SelectItem>
                                        <SelectItem value="Luxurious & Exclusive">Luxurious & Exclusive</SelectItem>
                                        <SelectItem value="Informative & Educational">Informative & Educational</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="hookStyle">Hook Style</Label>
                                <Select value={hookStyle} onValueChange={setHookStyle}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Question-based">Question-based ("What if you could...")</SelectItem>
                                        <SelectItem value="Problem/Solution">Problem/Solution ("Tired of... Here's the fix.")</SelectItem>
                                        <SelectItem value="Surprising Stat">Surprising Stat ("Did you know...")</SelectItem>
                                        <SelectItem value="Direct & Bold">Direct & Bold ("Stop scrolling.")</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                                {isLoading ? 'Writing...' : 'Generate Scripts'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <div className="lg:col-span-2">
                    {isLoading ? (
                        <Card className="flex items-center justify-center min-h-[300px]">
                            <div className="text-center text-muted-foreground">
                                <Loader2 className="h-10 w-10 animate-spin text-primary mb-2 mx-auto" />
                                <p>Writing your scripts...</p>
                            </div>
                        </Card>
                    ) : result ? (
                        <div className="space-y-4">
                            {result.scripts.map((script, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle>Script Variation {index + 1}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-sm">
                                        <p><strong>Hook:</strong> {script.hook}</p>
                                        <p><strong>Body:</strong> {script.body}</p>
                                        <p><strong>CTA:</strong> {script.callToAction}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="flex items-center justify-center min-h-[300px] border-dashed">
                             <div className="text-center text-muted-foreground">
                                <Mic className="h-12 w-12 mx-auto mb-2" />
                                <p>Your generated scripts will appear here.</p>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
