
'use client';

import React from 'react';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Users, BookOpen, Briefcase, Mail, BarChart, User, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CommunityHeader } from '@/components/community-header';

const successStories = [
    {
        quote: "The AI Suite transformed my workflow. I went from spending hours on ad creatives to generating entire campaigns in minutes. My lead conversion has tripled.",
        name: "Fatima Al-Mansoori",
        title: "Top Agent, Dubai Real Estate",
        avatar: "https://i.pravatar.cc/150?img=1",
        image: "https://picsum.photos/seed/story1/600/400",
        dataAiHint: "woman working laptop"
    },
    {
        quote: "As a solo marketer, I was drowning. Now, the AI handles the repetitive tasks, and I can focus on strategy. The Market Reports tool alone is worth the subscription.",
        name: "Johnathan Chen",
        title: "Real Estate Marketer",
        avatar: "https://i.pravatar.cc/150?img=3",
        image: "https://picsum.photos/seed/story2/600/400",
        dataAiHint: "man presenting chart"
    }
];

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <CommunityHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <PageHeader
            icon={<Users className="h-8 w-8" />}
            title="Join the Community of Super Sellers"
            description="Learn from the best, share your successes, and grow with a network of forward-thinking real estate professionals."
        />

        <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {successStories.map((story, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="relative h-56 w-full">
                                <Image src={story.image} alt={story.name} layout="fill" objectFit="cover" data-ai-hint={story.dataAiHint} />
                            </div>
                            <div className="p-6">
                                <blockquote className="text-lg font-semibold leading-snug text-foreground">
                                    “{story.quote}”
                                </blockquote>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/50 p-4">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={story.avatar} />
                                    <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-foreground">{story.name}</p>
                                    <p className="text-sm text-muted-foreground">{story.title}</p>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
