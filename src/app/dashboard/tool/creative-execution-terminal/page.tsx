'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import Image from 'next/image';

// This is a placeholder for the actual API call
// import { runGenerateModelVisual } from '@/lib/api'; 

export default function CreativeExecutionTerminalPage() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      setError('Please provide a prompt for the visual.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    // Simulate API call to the Genkit flow
    setTimeout(() => {
        // This is where you would call your actual API:
        // const { imageDataUri } = await runGenerateModelVisual({ prompt });
        
        // For now, we'll use a placeholder image to simulate the output
        const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHJ4PSI0MCIgZmlsbD0iIzIyYzVlZSI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxMDBweCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPjUwMCB4IDUwMDwvdGV4dD48L3N2Zz4=';
        setGeneratedImage(placeholderImage);
        setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Creative Execution Terminal"
        description="Your personal AI studio for generating stunning visuals from text prompts."
        icon={<Wand2 className="h-6 w-6" />}
      />
      <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="lg:col-span-1">
          <Card className="bg-card/80 backdrop-blur-lg sticky top-24">
            <CardHeader>
              <CardTitle>Image Prompt</CardTitle>
              <CardDescription>Describe the visual you want the AI to create.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt</Label>
                  <Textarea 
                    id="prompt" 
                    placeholder="e.g., 'An abstract, minimalist visualization of three glowing chat bubbles...'" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="h-40"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Generate Visual
                </Button>
              </form>
              {error && <p className="text-destructive text-sm mt-4">{error}</p>}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
           <Card className="bg-card/80 backdrop-blur-lg h-full min-h-[400px]">
            <CardHeader>
              <CardTitle>Generated Visual</CardTitle>
              <CardDescription>The AI-generated image will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-full">
              {isLoading ? (
                <div className="flex items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              ) : generatedImage ? (
                <Image 
                    src={generatedImage} 
                    alt="AI-generated visual" 
                    width={512} 
                    height={512} 
                    className="rounded-lg object-contain"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                    <p>Your generated visual will be displayed here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
