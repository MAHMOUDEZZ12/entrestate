
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { School, Building, Landmark, LineChart, Sparkles, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

const curriculumBranches = [
    { 
        title: "The Developer Curriculum", 
        icon: <Building className="h-6 w-6"/>,
        description: "Master the art of project marketing, from pre-launch strategy to sales velocity.",
        audience: "For marketing managers at development firms and agents specializing in off-plan sales.",
        courses: ["Off-Plan Marketing Mastery", "Channel Partner Management", "Project Launch Sequencing"],
    },
    { 
        title: "The Government Curriculum", 
        icon: <Landmark className="h-6 w-6"/>,
        description: "Navigate regulations, understand master plans, and leverage government data for a competitive edge.",
        audience: "For public sector employees, policy advisors, and compliance-focused brokers.",
        courses: ["DLD & RERA Compliance", "Understanding Urban Master Plans", "Public-Private Partnerships"],
    },
    { 
        title: "The Market Curriculum", 
        icon: <LineChart className="h-6 w-6"/>,
        description: "Become an expert in market analysis, trend forecasting, and data-driven investment strategies.",
        audience: "For investment advisors, portfolio managers, and ambitious agents.",
        courses: ["Advanced Deal Analysis", "Predictive Market Forecasting", "Cross-Portal Analytics"],
    },
];

export default function AcademyPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Entrestate Academy"
        description="Your central hub for mastering the new landscape of real estate. Choose a curriculum, complete courses, and earn certifications."
        icon={<School className="h-8 w-8" />}
      />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-16">
        <section>
            <Card className="bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">My Progress</CardTitle>
                    <CardDescription>Your journey to becoming a Super Agent.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-background/50 rounded-lg text-center">
                        <p className="text-sm font-semibold text-muted-foreground">Market IQ Points</p>
                        <p className="text-4xl font-bold text-primary">1,250</p>
                    </div>
                    <div className="p-4 bg-background/50 rounded-lg text-center">
                        <p className="text-sm font-semibold text-muted-foreground">Certifications Unlocked</p>
                        <p className="text-4xl font-bold text-primary">3</p>
                    </div>
                     <div className="p-4 bg-background/50 rounded-lg">
                        <p className="text-sm font-semibold text-muted-foreground text-center mb-2">Level Progress</p>
                        <Progress value={66} />
                        <p className="text-xs text-center text-muted-foreground mt-1">Next Level: Market Analyst</p>
                    </div>
                </CardContent>
            </Card>
        </section>

        <section>
            <Card className="bg-amber-500/10 border-amber-500/20 text-center">
                <CardHeader>
                    <Star className="h-8 w-8 text-amber-500 mx-auto mb-2"/>
                    <CardTitle className="text-2xl font-bold">New: Starter AI in Real Estate</CardTitle>
                    <CardDescription>Your perfect introduction to leveraging AI in your daily workflow.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="max-w-2xl mx-auto text-muted-foreground">This foundational course covers how to use our core AI tools to find better leads, create stunning marketing content, and close deals faster. No technical experience required.</p>
                </CardContent>
                <CardFooter className="justify-center">
                    <Button variant="default">Enroll Now (Free)</Button>
                </CardFooter>
            </Card>
        </section>

        <section>
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-heading">Choose Your Curriculum</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Each curriculum provides a structured path to mastering a specific domain within the real estate industry.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {curriculumBranches.map(branch => (
                    <Card key={branch.title} className="hover:shadow-xl transition-shadow flex flex-col bg-card/80">
                        <CardHeader>
                            <div className="p-4 bg-primary/10 text-primary rounded-full w-fit mb-4">
                                {branch.icon}
                            </div>
                            <CardTitle>{branch.title}</CardTitle>
                            <CardDescription>{branch.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm">Target Audience:</h4>
                                <p className="text-sm text-muted-foreground">{branch.audience}</p>
                            </div>
                             <div>
                                <h4 className="font-semibold text-sm">Example Courses:</h4>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                    {branch.courses.map(course => <li key={course}>{course}</li>)}
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="secondary" className="w-full" disabled>View Curriculum (Coming Q4)</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>

         <section>
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-heading">App & Solution Guides</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Learn how to master each tool in the Entrestate suite with short videos and step-by-step guides.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/blog/meta-auto-pilot"><Button variant="outline" className="w-full justify-start h-12 text-base"><Sparkles className="mr-3 h-5 w-5"/>How to use Meta Auto Pilot</Button></Link>
                <Link href="/blog/listing-generator"><Button variant="outline" className="w-full justify-start h-12 text-base"><Sparkles className="mr-3 h-5 w-5"/>How to use Listing Generator</Button></Link>
                <Link href="/resources/flows"><Button variant="outline" className="w-full justify-start h-12 text-base"><Sparkles className="mr-3 h-5 w-5"/>How to build a Flow</Button></Link>
            </div>
             <div className="text-center mt-8">
                 <Link href="/blog">
                    <Button>Explore All Guides</Button>
                 </Link>
             </div>
        </section>
      </main>
    </div>
  );
}
