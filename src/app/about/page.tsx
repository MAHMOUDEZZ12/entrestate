'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { Users2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Logo } from '@/components/logo';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <PageHeader
          title="About Entrestate"
          description="We are building the AI-native operating system for the real estate industry."
          icon={<Users2 className="h-8 w-8" />}
        />
        <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <Card className="bg-card/80 backdrop-blur-lg">
              <CardContent className="p-8 md:p-12 prose prose-lg dark:prose-invert max-w-none">
                  <div className="flex justify-center mb-8">
                      <Logo />
                  </div>
                  
                  <h2>A Note from the Creator</h2>
                  <p>
                      In the fast-paced world of real estate, the gap between data and decision is where fortunes are made and lost. For years, I watched brilliant agents, developers, and marketers operate with fragmented tools and incomplete information, relying on intuition where they should have had certainty.
                  </p>
                  <p>
                      That’s why Entrestate was born. It’s not about replacing the agent, but empowering them to become a "Super Agent." It’s about transforming raw, chaotic market data—from portals like Bayut and Property Finder, to social trends and DLD records—into clear, actionable intelligence. It's about automating the mundane tasks that consume 80% of your day, so you can focus on what you do best: building relationships and closing deals.
                  </p>
                  <p>
                      We are forging a new paradigm where technology and human expertise converge to create an unparalleled advantage. This is more than a company; it's a commitment to building the future of real estate, one intelligent tool at a time.
                  </p>

                  <div className="text-center mt-12">
                      <Link href="/me">
                          <Button size="lg">Join Us in Building the Future</Button>
                      </Link>
                  </div>
              </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
