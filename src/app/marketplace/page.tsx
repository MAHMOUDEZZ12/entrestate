

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
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { solutions } from '@/lib/solutions-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { FilterCategory } from '@/types';


export default function MarketplacePage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [addedApps, setAddedApps] = useState<string[]>([]);
  const [filteredTools, setFilteredTools] = useState<Feature[]>(allTools);
  
  const allCategories = ['All', ...new Set(allTools.flatMap(t => t.categories))] as FilterCategory[];
  const [activeFilter, setActiveFilter] = React.useState<FilterCategory>('All');
  
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
  
  useEffect(() => {
    const searchFiltered = allTools.filter(tool =>
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const categoryFiltered = activeFilter === 'All' 
        ? searchFiltered
        : searchFiltered.filter(p => p.categories.includes(activeFilter));

    setFilteredTools(categoryFiltered);
  }, [searchTerm, activeFilter]);

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
    'market-search-engine': '#4285F4', // Google Blue
    'salesagentchat-ai': '#075E54', // WhatsApp Green
    'ai-listing-portal': '#FF4500' // OrangeRed
  };


  return (
    <div className="p-4 md:p-10 space-y-8 container mx-auto">
       <PageHeader
        title="Marketplace"
        description="Discover powerful AI apps and solutions to automate your workflow."
        icon={<LayoutGrid className="h-8 w-8" />}
      >
        <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search apps & solutions..."
                className="pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
      </PageHeader>
      
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            {filteredTools.map(tool => (
                <DashboardServiceCard 
                    key={tool.id} 
                    tool={tool}
                    isAdded={addedApps.includes(tool.id)}
                    setIsAdded={(isAdded) => handleSetIsAdded(tool.id, isAdded)}
                    connectionRequired={appsThatNeedConnection[tool.id]}
                />
            ))}
        </div>

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
