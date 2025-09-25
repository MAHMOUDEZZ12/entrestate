

'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { LayoutGrid, Search, Telescope, MessageCircle, FileJson, ArrowRight, Sparkles, Building, Workflow } from 'lucide-react';
import { tools as allTools, Feature } from '@/lib/tools-client';
import { DashboardServiceCard } from '@/components/ui/dashboard-service-card';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { track } from '@/lib/events';
import { marketingSuites } from '@/lib/suites-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { solutions } from '@/lib/solutions-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { motion } from 'framer-motion';


const SuiteCard = ({ tool }: { tool: Feature }) => (
    <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
        <div className="p-2 rounded-md text-white" style={{ backgroundColor: tool.color }}>
            {React.cloneElement(tool.icon, { className: 'h-5 w-5' })}
        </div>
        <div>
            <p className="text-sm font-semibold">{tool.dashboardTitle || tool.title}</p>
        </div>
    </div>
);

export default function MarketplacePage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [addedApps, setAddedApps] = useState<string[]>([]);
  
  const filteredTools = React.useMemo(() => {
    if (!searchTerm) return allTools;
    return allTools.filter(tool =>
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const getSuiteTools = (suiteName: string) => filteredTools.filter(t => t.suite === suiteName);
  
  return (
    <div className="p-4 md:p-10 space-y-20 container mx-auto">
       <PageHeader
        title="Lead quality isn’t luck—it requires fluency in algorithms: AI speaking to AI."
        description=""
      >
        <div className="relative w-full max-w-lg mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search for solutions, suites, or apps..."
                className="pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
      </PageHeader>
      
       <section>
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Meta Marketing Suite</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {getSuiteTools('Meta Marketing Suite').map(tool => (
                   <DashboardServiceCard 
                        key={tool.id} 
                        tool={tool}
                        isAdded={addedApps.includes(tool.id)}
                        setIsAdded={(isAdded) => {}}
                    />
              ))}
            </div>
            <div className="text-center mt-8">
                <Link href="/me">
                    <Button>Explore Meta Marketing Suite</Button>
                </Link>
            </div>
      </section>

      <section>
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Listing is an all-time task. Get AI to work.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-card/50 backdrop-blur-lg flex flex-col items-center justify-center p-8 text-center border-2 border-dashed">
                  <Building className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-2xl font-bold">Property Finder Pilot</h3>
                  <p className="text-muted-foreground">Automate your listings on Property Finder with our intelligent pilot.</p>
              </Card>
              <Card className="bg-card/50 backdrop-blur-lg flex flex-col items-center justify-center p-8 text-center border-2 border-dashed">
                  <Building className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold">Bayut Pilot</h3>
                  <p className="text-muted-foreground">Sync your inventory seamlessly with Bayut, validated and optimized.</p>
              </Card>
          </div>
      </section>
      
      <section>
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 md:p-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold font-heading">Creative Studio is now with flows.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 text-center">
                <div className="space-y-3">
                    {getSuiteTools('AI Creative Studio').slice(0,3).map(tool => <SuiteCard key={tool.id} tool={tool} />)}
                </div>
                <div className="flex flex-col items-center">
                   <Plus className="h-12 w-12 text-muted-foreground" />
                   <Workflow className="h-20 w-20 text-muted-foreground my-4" />
                   <ArrowRight className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                   <Card className="bg-background shadow-2xl animate-pulse">
                        <CardHeader>
                            <CardTitle>Unprecedented Value</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-4xl font-bold text-primary">200%+</p>
                           <p className="text-muted-foreground">Increase in Creative Output</p>
                        </CardContent>
                   </Card>
                </div>
            </div>
        </Card>
      </section>

      <section>
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Lead Intelligence, done by algorithm-native speakers.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 space-y-4">
                 {getSuiteTools('Lead Intelligence AI').slice(0,2).map(tool => <SuiteCard key={tool.id} tool={tool} />)}
              </div>
               <div className="md:col-span-1 self-center space-y-4">
                 {getSuiteTools('Lead Intelligence AI').slice(2,3).map(tool => <SuiteCard key={tool.id} tool={tool} />)}
              </div>
               <div className="md:col-span-1 space-y-4">
                 {getSuiteTools('Lead Intelligence AI').slice(3,5).map(tool => <SuiteCard key={tool.id} tool={tool} />)}
              </div>
          </div>
      </section>

       <section>
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Marketing Management</h2>
             <p className="text-lg text-muted-foreground mt-2">It's a team, not just an app. Really!</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {getSuiteTools('Marketing Management').map(tool => (
                   <DashboardServiceCard 
                        key={tool.id} 
                        tool={tool}
                        isAdded={addedApps.includes(tool.id)}
                        setIsAdded={(isAdded) => {}}
                    />
              ))}
            </div>
      </section>

       <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Core Solutions</h2>
             <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                High-level, outcome-oriented products designed to solve major business problems for the real estate industry.
            </p>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solutions.map(solution => (
                    <Link href={`/solutions/${solution.slug}`} key={solution.slug}>
                        <Card 
                            className="h-full hover:shadow-lg transition-all hover:-translate-y-1 bg-card/50 backdrop-blur-lg border-b-4"
                            style={{'--card-border-color': solution.slug === 'pro-search-eng-x3' ? '#4285F4' : solution.slug === 'estchat-x3' ? '#075E54' : '#FF4500' , borderBottomColor: 'var(--card-border-color)'} as React.CSSProperties}
                        >
                            <CardHeader>
                                <div 
                                    className="p-4 rounded-2xl w-fit mb-4 text-white"
                                    style={{backgroundColor: solution.slug === 'pro-search-eng-x3' ? '#4285F4' : solution.slug === 'estchat-x3' ? '#075E54' : '#FF4500'}}
                                >
                                    {solution.slug === 'pro-search-eng-x3' ? <Telescope className="h-8 w-8" /> : solution.slug === 'estchat-x3' ? <MessageCircle className="h-8 w-8" /> : <FileJson className="h-8 w-8" />}
                                </div>
                                <CardTitle>{solution.title}</CardTitle>
                                <CardDescription>{solution.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
      </section>
    </div>
  );
}
