

'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { LayoutGrid, Search, Telescope, MessageCircle, FileJson, ArrowRight } from 'lucide-react';
import { tools as allTools, Feature } from '@/lib/tools-client';
import { DashboardServiceCard } from '@/components/ui/dashboard-service-card';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { track } from '@/lib/events';
import { marketingSuites } from '@/lib/suites-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { solutions } from '@/lib/solutions-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { FilterCategory } from '@/types';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';


export default function MarketplacePage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [addedApps, setAddedApps] = useState<string[]>([]);
  
  const allCategories = ['All', ...new Set(allTools.flatMap(t => t.categories))] as FilterCategory[];
  const [activeFilter, setActiveFilter] = React.useState<FilterCategory>('All');
  
  const filteredTools = React.useMemo(() => {
    const searchFiltered = allTools.filter(tool =>
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return activeFilter === 'All' 
        ? searchFiltered
        : searchFiltered.filter(p => p.categories.includes(activeFilter));
  }, [searchTerm, activeFilter]);

  
  useEffect(() => {
    try {
        const savedState = localStorage.getItem('addedApps');
        if (savedState) {
            setAddedApps(JSON.parse(savedState));
        }
    } catch (e) {
        console.error("Could not load app state from localStorage", e);
    }
  }, []);
  

  const handleSetIsAdded = (toolId: string, isAdded: boolean) => {
    const newAddedApps = isAdded 
        ? [...addedApps, toolId]
        : addedApps.filter(id => id !== toolId);
    setAddedApps(newAddedApps);
    localStorage.setItem('addedApps', JSON.stringify(newAddedApps));
    track(isAdded ? 'app_added' : 'app_removed', { toolId });
  };
  
  const appsThatNeedConnection: { [key: string]: string } = {
    'meta-auto-pilot': 'Facebook',
    'audience-creator': 'Facebook',
    'insta-ads-designer': 'Instagram',
    'instagram-admin-ai': 'Instagram',
    'email-creator': 'Gmail / Outlook',
    'whatsapp-manager': 'WhatsApp Business',
  };
  
  const solutionColors: { [key: string]: string } = {
    'pro-search-eng-x3': '#4285F4', // Google Blue
    'estchat-x3': '#075E54', // WhatsApp Green
    'mega-listing-pro-2': '#FF4500' // OrangeRed
  };

  const suitesToDisplay = marketingSuites.filter(suite => 
      filteredTools.some(tool => tool.suite === suite.name)
  );

  return (
    <div className="p-4 md:p-10 space-y-12 container mx-auto">
       <PageHeader
        title="AI-native real estate MarketPlace"
        description="add and run. nothing more."
        icon={<LayoutGrid className="h-8 w-8" />}
      >
        <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search for solutions, suites, or apps..."
                className="pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
      </PageHeader>
      
       <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl font-semibold text-foreground/90">“Lead generation quality isn’t a wish—it requires AI speaking to AI, so you get exactly what you want. Unless you can speak algorithmic, you need a platform that does it for you.”</p>
      </div>

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
                            style={{'--card-border-color': solutionColors[solution.slug] || 'hsl(var(--accent))', borderBottomColor: 'var(--card-border-color)'} as React.CSSProperties}
                        >
                            <CardHeader>
                                <div 
                                    className="p-4 rounded-2xl w-fit mb-4 text-white"
                                    style={{backgroundColor: solutionColors[solution.slug] || 'hsl(var(--accent))'}}
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

       <Separator />

      <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">App Suites & Individual Tools</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore our collections of specialized apps or browse individual tools to customize your workspace.
            </p>
          </div>
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {allCategories.map(category => (
                 <Button 
                    key={category}
                    variant={activeFilter === category ? "default" : "outline"}
                    onClick={() => setActiveFilter(category)}
                    className="rounded-full"
                >
                    {category}
                </Button>
            ))}
        </div>
          
        {suitesToDisplay.map(suite => {
          const suiteTools = filteredTools.filter(t => t.suite === suite.name);
          if (suiteTools.length === 0) return null;
          
          return (
            <div key={suite.id} className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                    <suite.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-heading">{suite.name}</h3>
                  <p className="text-muted-foreground">{suite.description}</p>
                </div>
              </div>
              
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {suiteTools.map(tool => (
                       <DashboardServiceCard 
                            key={tool.id} 
                            tool={tool}
                            isAdded={addedApps.includes(tool.id)}
                            setIsAdded={(isAdded) => handleSetIsAdded(tool.id, isAdded)}
                            connectionRequired={appsThatNeedConnection[tool.id]}
                        />
                  ))}
                </div>
            </div>
          )
      })}

      {searchTerm && suitesToDisplay.length === 0 && (
          <div className="text-center py-16 text-muted-foreground col-span-full">
              <p>No apps or suites found for your search criteria.</p>
          </div>
      )}
      </section>

        <Card className="mt-12 bg-primary/10 border-primary/20">
            <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-primary">Ready to build your workspace?</h3>
                    <p className="text-primary/80">Go to your workspace to get started and add these powerful apps to your dashboard.</p>
                </div>
                <Link href="/me">
                    <Button size="lg">
                        Go to Workspace <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </Card>
    </div>
  );
}
