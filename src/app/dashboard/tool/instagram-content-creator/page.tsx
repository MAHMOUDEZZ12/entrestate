'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Loader2, Instagram } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
// This is a placeholder for the actual API call
// import { runInstagramContentCreator } from '@/lib/api'; 

interface DailyPost {
  day: string;
  postText: string;
  imageSuggestion: string;
}
interface HashtagStrategy {
  primary: string[];
  secondary: string[];
  location: string[];
}
interface PlanOutput {
  posts: DailyPost[];
  hashtagStrategy: HashtagStrategy;
}

export default function InstagramContentCreatorPage() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [plan, setPlan] = useState<PlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) {
      setError('Please provide a topic, property name, or URL.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setPlan(null);

    // Simulate API call to the Genkit flow
    setTimeout(() => {
        // This is where you would call your actual API:
        // const apiResponse = await runInstagramContentCreator({ topic, platform });
        const mockResponse: PlanOutput = {
          posts: [
            { day: 'Monday', postText: 'Start your week with a glimpse of luxury! Explore the stunning sea views from Emaar Beachfront...', imageSuggestion: 'A high-resolution photo of the view from a balcony at sunrise.' },
            { day: 'Tuesday', postText: 'Did you know? The amenities here include a private beach, infinity pool, and a state-of-the-art gym...', imageSuggestion: 'A collage of photos showcasing the amenities.' },
            { day: 'Wednesday', postText: 'Mid-week motivation: Imagine working from home with this as your backdrop. #workfromhome', imageSuggestion: 'A lifestyle shot of someone working on a laptop on a beautiful terrace.' },
            { day: 'Thursday', postText: 'Get an exclusive look inside! This 3-bedroom apartment features Italian marble and floor-to-ceiling windows...', imageSuggestion: 'A short video tour (Reel) of the apartment interior.' },
            { day: 'Friday', postText: 'Your weekend starts here. What would be the first thing you do after moving in?', imageSuggestion: 'An engaging question graphic overlayed on a picture of the property.' },
            { day: 'Saturday', postText: 'Community spotlight! Located just minutes from fine dining and shopping...', imageSuggestion: 'A map graphic showing the property and nearby attractions.' },
            { day: 'Sunday', postText: 'Relax, recharge, and reflect. Your dream home is waiting. Contact us for a private viewing.', imageSuggestion: 'A serene, peaceful image of the property\'s quietest corner.' },
          ],
          hashtagStrategy: {
            primary: ['#realestate', '#property', '#investment', '#luxuryhomes', '#dreamhome', '#interiordesign'],
            secondary: ['#emaarbeachfront', '#luxuryrealestate', '#apartmentliving', '#waterfronthomes'],
            location: ['#dubai', '#dubairealestate', '#visitdubai']
          }
        };
        setPlan(mockResponse);
        setIsLoading(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Instagram Content Creator"
        description="Generate a full 7-day social media plan from a single topic."
        icon={<Instagram className="h-6 w-6" />}
      />
      <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="bg-card/80 backdrop-blur-lg sticky top-24">
            <CardHeader>
              <CardTitle>Content Inputs</CardTitle>
              <CardDescription>Provide the source material for the AI.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic or Property Name/URL</Label>
                  <Textarea 
                    id="topic" 
                    placeholder="e.g., 'Emaar Beachfront, 3-bedroom with sea view'" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="h-32"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="X">X (Twitter)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Generate 7-Day Plan
                </Button>
              </form>
              {error && <p className="text-destructive text-sm mt-4">{error}</p>}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
           {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}
          {plan && (
            <>
              <Card className="bg-card/80 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle>Generated 7-Day Content Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {plan.posts.map(post => (
                    <div key={post.day} className="p-4 border rounded-lg">
                      <h3 className="font-bold font-heading text-lg text-primary mb-2">{post.day}</h3>
                      <p className="whitespace-pre-wrap mb-2">{post.postText}</p>
                      <p className="text-sm text-muted-foreground"><strong>Image Idea:</strong> {post.imageSuggestion}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
               <Card className="bg-card/80 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle>AI Hashtag Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <h4 className="font-semibold mb-2">Primary Hashtags</h4>
                        <p className="text-muted-foreground">{plan.hashtagStrategy.primary.join(' ')}</p>
                    </div>
                     <div className="mt-4">
                        <h4 className="font-semibold mb-2">Secondary Hashtags</h4>
                        <p className="text-muted-foreground">{plan.hashtagStrategy.secondary.join(' ')}</p>
                    </div>
                     <div className="mt-4">
                        <h4 className="font-semibold mb-2">Location Hashtags</h4>
                        <p className="text-muted-foreground">{plan.hashtagStrategy.location.join(' ')}</p>
                    </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
