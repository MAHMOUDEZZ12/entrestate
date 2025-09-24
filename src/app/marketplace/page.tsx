

'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { LayoutGrid, Search, Telescope, MessageCircle, FileJson } from 'lucide-react';
import { tools as allTools, ToolData } from '@/lib/tools-data';
import { DashboardServiceCard } from '@/components/ui/dashboard-service-card';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { track } from '@/lib/events';
import { marketingSuites } from '@/lib/suites-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { solutions } from '@/lib/solutions-data';


export default function MarketplacePage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [addedApps, setAddedApps] = useState<string[]>([]);
  const [filteredTools, setFilteredTools] = useState<ToolData[]>(allTools);

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
    const results = allTools.filter(tool =>
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredTools(results);
  }, [searchTerm]);

  const handleSetIsAdded = (toolId: string, isAdded: boolean) => {
    const newAddedApps = isAdded 
        ? [...addedApps, toolId]
        : addedApps.filter(id => id !== toolId);
    setAddedApps(newAddedApps);
    localStorage.setItem('addedApps', JSON.stringify(newAddedApps));
    track(isAdded ? 'app_added' : 'app_removed', { toolId });
  };
  
  const appsThatNeedConnection: { [key: string]: string } = {
    'meta-ads-copilot': 'Facebook',
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
        
        <Tabs defaultValue="all">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                {marketingSuites.map(suite => (
                    <TabsTrigger key={suite.id} value={suite.id}>{suite.name}</TabsTrigger>
                ))}
            </TabsList>

            <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
                                        {solution.slug === 'market-search-engine' ? <Telescope className="h-8 w-8" /> : solution.slug === 'salesagentchat-ai' ? <MessageCircle className="h-8 w-8" /> : <FileJson className="h-8 w-8" />}
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
            </TabsContent>

            {marketingSuites.map(suite => (
                <TabsContent key={suite.id} value={suite.id} className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {allTools.filter(t => t.suite === suite.name).map(tool => (
                            <DashboardServiceCard 
                                key={tool.id} 
                                tool={tool}
                                isAdded={addedApps.includes(tool.id)}
                                setIsAdded={(isAdded) => handleSetIsAdded(tool.id, isAdded)}
                                connectionRequired={appsThatNeedConnection[tool.id]}
                            />
                        ))}
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    </div>
  );
}
