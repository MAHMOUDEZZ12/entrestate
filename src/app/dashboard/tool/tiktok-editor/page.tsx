
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

export default function TiktokEditorPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const [projectId, setProjectId] = useState('');
  const [sound, setSound] = useState('Trending Upbeat Pop');
  const [textOverlays, setTextOverlays] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !textOverlays) {
      toast({ title: "All fields are required", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
        setResult('data:video/mp4;base64,'); // Placeholder for a real video data URI
        setIsLoading(false);
        toast({ title: 'TikTok Video Generated!', description: 'Your new video is ready for the world.' });
    }, 3000);
  };

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="TikTok Video Generator"
        description="Create short, on-trend video clips ready for TikTok, using your project assets and syncing to trending audio styles."
        icon={<Video className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>TikTok Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectId">Project</Label>
                 <Select value={projectId} onValueChange={setProjectId}>
                    <SelectTrigger><SelectValue placeholder="Select a project from your library" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="emaar-beachfront">Emaar Beachfront</SelectItem>
                        <SelectItem value="damac-hills-2">Damac Hills 2</SelectItem>
                        <SelectItem value="sobha-hartland">Sobha Hartland</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sound">Trending Sound Style</Label>
                 <Select value={sound} onValueChange={setSound}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Trending Upbeat Pop">Trending Upbeat Pop</SelectItem>
                        <SelectItem value="Cinematic Orchestral">Cinematic Orchestral</SelectItem>
                        <SelectItem value="Lo-fi Hip Hop">Lo-fi Hip Hop</SelectItem>
                    </SelectContent>
                </Select>
              </div>
               <div className="space-y-2">
                <Label htmlFor="textOverlays">Text Overlays</Label>
                <Textarea id="textOverlays" value={textOverlays} onChange={e => setTextOverlays(e.target.value)} placeholder="One overlay per line...\nThis is your hook!\nThen the main point." required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {isLoading ? 'Generating...' : 'Generate TikTok Video'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Video</CardTitle>
            <CardDescription>Your TikTok-ready video will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
            {isLoading ? (
                <div className="text-center text-muted-foreground">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mb-2 mx-auto" />
                    <p>Generating your video...</p>
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
