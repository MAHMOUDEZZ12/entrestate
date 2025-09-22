
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { School, CheckCircle, Video, Workflow, Building, Landmark, LineChart, Award, Sparkles, BookOpen, Bot, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

const curriculumBranches = [
    { 
        title: "The Developer Curriculum", 
        icon: <Building />,
        description: "Master the art of project marketing, from pre-launch strategy to sales velocity.",
        audience: "For marketing managers at development firms and agents specializing in off-plan sales.",
        courses: ["Off-Plan Marketing Mastery", "Channel Partner Management", "Project Launch Sequencing"],
    },
    { 
        title: "The Government Curriculum", 
        icon: <Landmark />,
        description: "Navigate regulations, understand master plans, and leverage government data for a competitive edge.",
        audience: "For public sector employees, policy advisors, and compliance-focused brokers.",
        courses: ["DLD & RERA Compliance", "Understanding Urban Master Plans", "Public-Private Partnerships"],
    },
    { 
        title: "The Market Curriculum", 
        icon: <LineChart />,
        description: "Become an expert in market analysis, trend forecasting, and data-driven investment strategies.",
        audience: "For investment advisors, portfolio managers, and ambitious agents.",
        courses: ["Advanced Deal Analysis", "Predictive Market Forecasting", "Cross-Portal Analytics"],
    },
];

const resourceLinks = [
  {
    icon: <Workflow className="h-6 w-6 text-primary" />,
    title: 'Flow Library',
    description: 'Explore pre-built automations that connect your apps into powerful workflows.',
    href: '/resources/flows',
  },
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: 'Documentation',
    description: 'Dive deep into the technical details of our tools and APIs.',
    href: '/documentation',
  },
  {
    icon: <Bot className="h-6 w-6 text-primary" />,
    title: 'Core Concepts',
    description: 'Understand the building blocks of the Entrestate ecosystem.',
    href: '/sx3-mindmap',
  },
];

export default function AcademyPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Academy & Resources"
        description="Your central hub for learning, inspiration, and technical documentation."
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
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-heading">Choose Your Curriculum</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    The Academy provides a structured path to mastering the new landscape of real estate. Choose your curriculum, complete courses, and earn certifications.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {curriculumBranches.map(branch => (
                    <Card key={branch.title} className="hover:shadow-xl transition-shadow flex flex-col">
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
                <h2 className="text-3xl md:text-4xl font-bold font-heading">Resource Hub</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Quick links to our most important resources for developers and power users.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {resourceLinks.map((link) => (
                    <Card key={link.title} className="flex flex-col bg-card/80 backdrop-blur-lg hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            {link.icon}
                            <CardTitle>{link.title}</CardTitle>
                        </div>
                        <CardDescription className="pt-2">{link.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-end">
                        <Link href={link.href} className="w-full">
                            <Button variant="outline" className="w-full">
                                Go to {link.title}
                            </Button>
                        </Link>
                    </CardContent>
                    </Card>
                ))}
            </div>
         </section>
      </main>
    </div>
  );
}
