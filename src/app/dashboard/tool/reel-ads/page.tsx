
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Loader2, Video, Upload } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { useToast } from '@/hooks/use-toast';

export default function ReelAdsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const [projectId, setProjectId] = useState('');
  const [sellingPoints, setSellingPoints] = useState('');
  const [vibe, setVibe] = useState('Modern');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !sellingPoints) {
      toast({ title: "All fields are required", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
        setResult('data:video/mp4;base64,'); // Placeholder for a real video data URI
        setIsLoading(false);
        toast({ title: 'Reel Generated!', description: 'Your new video reel is ready.' });
    }, 3000);
  };

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Reel Ads Generator"
        description="Create short, engaging video reels from your project assets with auto-captions and trending audio styles."
        icon={<Video className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Reel Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectId">Project</Label>
                 <Select value={projectId} onValueChange={setProjectId}>
                    <SelectTrigger><SelectValue placeholder="Select a project" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="emaar-beachfront">Emaar Beachfront</SelectItem>
                        <SelectItem value="damac-hills-2">Damac Hills 2</SelectItem>
                        <SelectItem value="sobha-hartland">Sobha Hartland</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellingPoints">Key Selling Points</Label>
                <Textarea id="sellingPoints" value={sellingPoints} onChange={e => setSellingPoints(e.target.value)} placeholder="Enter each point on a new line for text overlays..." required />
              </div>
               <div className="space-y-2">
                <Label htmlFor="vibe">Vibe</Label>
                 <Select value={vibe} onValueChange={setVibe}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Modern">Modern & Fast-Paced</SelectItem>
                        <SelectItem value="Luxury">Luxury & Cinematic</SelectItem>
                        <SelectItem value="UGC">Authentic & UGC-Style</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {isLoading ? 'Generating...' : 'Generate Reel'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Reel</CardTitle>
            <CardDescription>Your video will appear here when ready.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
            {isLoading ? (
                <div className="text-center text-muted-foreground">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mb-2 mx-auto" />
                    <p>Generating your reel...</p>
                </div>
            ) : result ? (
                <video src={result} controls className="w-full rounded-lg" />
            ) : (
                <div className="text-center text-muted-foreground">
                    <Video className="h-12 w-12 mx-auto mb-2" />
                    <p>Your video will be displayed here.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
