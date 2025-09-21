
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowRight, BookOpen, GitFork, Users2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LandingHeader } from '../landing-header';
import { LandingFooter } from '../landing-footer';

const communityLinks = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Documentation',
    description: 'Dive deep into the technical details of our tools and APIs. Get started with our comprehensive guides.',
    href: '/community/documentation',
    cta: 'Read the Docs',
  },
  {
    icon: <GitFork className="h-8 w-8 text-primary" />,
    title: 'Roadmap',
    description: 'See what we\'re building next. Vote on new features and help shape the future of real estate intelligence.',
    href: '/community/roadmap',
    cta: 'View the Roadmap',
  },
  {
    icon: <Users2 className="h-8 w-8 text-primary" />,
    title: 'Join the Conversation',
    description: 'Connect with other real estate professionals, share best practices, and get support from the community and our team.',
    href: '#', // Placeholder for a forum or Discord link
    cta: 'Coming Soon',
  },
];

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1">
        <PageHeader
          title="Join the Entrestate Community"
          description="Connect, learn, and grow with a network of forward-thinking real estate professionals."
          icon={<Users2 className="h-8 w-8" />}
        />
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {communityLinks.map((link) => (
              <Card key={link.title} className="flex flex-col bg-card/80 backdrop-blur-lg">
                <CardHeader>
                  {link.icon}
                  <CardTitle className="mt-4">{link.title}</CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-end">
                  <Link href={link.href} className="w-full">
                    <Button variant="outline" className="w-full">
                      {link.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
