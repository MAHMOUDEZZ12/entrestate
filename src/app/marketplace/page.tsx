

'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { LayoutGrid, Search, Sparkles } from 'lucide-react';
import { tools as allTools, ToolData } from '@/lib/tools-data';
import { DashboardServiceCard } from '@/components/ui/dashboard-service-card';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { track } from '@/lib/events';
import { marketingSuites } from '@/lib/suites-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { solutions } from '@/lib/solutions-data';
import { Telescope, MessageCircle, FileJson } from 'lucide-react';


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


  return (
    <div className="p-4 md:p-10 space-y-8 container mx-auto">
       <PageHeader
        title="Marketplace"
        description="Discover and add powerful AI apps and solutions to your workspace. Each is a specialized tool designed to automate a specific part of your workflow."
        icon={<LayoutGrid className="h-8 w-8" />}
      />

        <section id="solutions" className="py-12">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Core Solutions</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {solutions.map(solution => (
                    <Link href={`/solutions/${solution.slug}`} key={solution.slug}>
                        <Card className="h-full hover:border-accent hover:shadow-lg transition-all hover:-translate-y-1 bg-card/50 backdrop-blur-lg border-2 border-transparent hover:shadow-accent/20">
                            <CardHeader>
                                <div className="p-4 bg-accent/10 text-accent rounded-2xl w-fit mb-4">
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
        
        <section id="apps" className="py-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Individual Apps</h2>
                <p className="text-muted-foreground mt-2">Browse the full library of AI-powered tools.</p>
                 <div className="relative max-w-lg mx-auto mt-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search apps..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        
            <Tabs defaultValue="all">
                <TabsList>
                    <TabsTrigger value="all">All Apps</TabsTrigger>
                    {marketingSuites.map(suite => (
                        <TabsTrigger key={suite.id} value={suite.id}>{suite.name}</TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="all" className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
        </section>
    </div>
  );
}
