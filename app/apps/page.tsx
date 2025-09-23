
'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { tools, Suite } from '@/lib/tools-data';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { ArrowRight, LayoutGrid } from 'lucide-react';
import { suites } from '@/lib/suites-data';

export default function AppsPage() {
    
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1">
        <PageHeader
          title="The Planet Store"
          description="Each Planet is a self-contained ecosystem of apps, data, and workflows designed to master a core area of your business. Unlock Universe Values by acquiring multiple planets."
          icon={<LayoutGrid className="h-8 w-8" />}
        />
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suites.map((suite) => (
              <Link href={`/apps/${suite.id}`} key={suite.id} className="block group">
                <Card className="h-full flex flex-col hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                     <div className="p-4 bg-primary/10 text-primary rounded-full w-fit mb-4">
                        {React.createElement(suite.icon, { className: 'h-8 w-8' })}
                    </div>
                    <CardTitle className="text-2xl font-bold font-heading">{suite.name}</CardTitle>
                    <CardDescription>{suite.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                      <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          Explore Planet <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}

