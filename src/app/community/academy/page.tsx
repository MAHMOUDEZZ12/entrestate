
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { School, CheckCircle, Video, Workflow } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const upcomingCourses = [
    { title: "AI-Powered Lead Generation", icon: <Video /> },
    { title: "Automated Marketing Workflows", icon: <Workflow /> },
    { title: "Mastering the AI Co-Pilot", icon: <CheckCircle /> },
];

export default function AcademyPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Entrestate Academy"
        description="Learn the strategies and workflows of top-performing real estate professionals."
        icon={<School className="h-8 w-8" />}
      />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <Card className="bg-card/80 backdrop-blur-lg text-center">
            <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold font-heading">The Curriculum is Being Developed.</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    We are working with industry leaders to create courses on AI-powered lead generation, automated marketing, and more. Our first courses will be launching in Q4 2024.
                </p>
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Courses Coming Soon:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        {upcomingCourses.map(course => (
                            <div key={course.title} className="p-4 bg-muted/50 rounded-lg">
                                <div className="p-3 bg-primary/10 text-primary rounded-full w-fit mx-auto mb-3">
                                    {course.icon}
                                </div>
                                <p className="font-semibold">{course.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
