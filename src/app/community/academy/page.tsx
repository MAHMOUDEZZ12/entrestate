
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { School, CheckCircle, Video, Workflow, Building, Landmark, LineChart, Award, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const curriculumBranches = [
    { 
        title: "The Developer Curriculum", 
        icon: <Building />,
        description: "Master the art of project marketing, from pre-launch strategy to sales velocity."
    },
    { 
        title: "The Government Curriculum", 
        icon: <Landmark />,
        description: "Navigate regulations, understand master plans, and leverage government data for a competitive edge."
    },
    { 
        title: "The Market Curriculum", 
        icon: <LineChart />,
        description: "Become an expert in market analysis, trend forecasting, and data-driven investment strategies."
    },
];

export default function AcademyPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Entrestate Academy"
        description="Master the skills, strategies, and AI tools that define the future of real estate."
        icon={<School className="h-8 w-8" />}
      />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <section className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">The Operating System for the Super Agent</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                The Academy provides a structured path to mastering the new landscape of real estate. Choose your curriculum, complete courses, and earn certifications that prove your expertise.
            </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {curriculumBranches.map(branch => (
                <Card key={branch.title} className="text-center">
                    <CardHeader>
                        <div className="p-4 bg-primary/10 text-primary rounded-full w-fit mx-auto mb-4">
                            {branch.icon}
                        </div>
                        <CardTitle>{branch.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{branch.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
        
        <Card className="bg-primary/10 border-primary/20 text-center">
            <CardContent className="p-8 md:p-12">
                <div className="p-4 bg-primary text-primary-foreground rounded-full w-fit mx-auto mb-4">
                    <Award className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold font-heading">Student Benefits</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                   Enrolling in any course grants you "Student Status," unlocking limited free access to our premium AI tools to help you apply what you've learned.
                </p>
                <div className="mt-6">
                    <Link href="/pricing">
                        <Button>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Explore Student Perks & Pricing
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
        
         <div className="text-center mt-16">
            <h3 className="text-2xl font-semibold mb-4">Curriculum Coming Soon</h3>
            <p className="text-muted-foreground">Our first courses are in development and will be available in Q4 2024.</p>
        </div>

      </main>
    </div>
  );
}
