

'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { LayoutGrid, Search } from 'lucide-react';
import { tools as allTools, Feature } from '@/lib/tools-client';
import { DashboardServiceCard } from '@/components/ui/dashboard-service-card';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { track } from '@/lib/events';
import { marketingSuites } from '@/lib/suites-data';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';


export default function MarketingPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [addedApps, setAddedApps] = useState<string[]>([]);
  const [filteredTools, setFilteredTools] = useState<Feature[]>(allTools);

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
    if (!user) {
        toast({ title: 'Please log in', description: 'You need to be logged in to manage apps.', variant: 'destructive'});
        return;
    }
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
  
  const suitesToDisplay = marketingSuites.filter(suite => 
      filteredTools.some(tool => tool.suite === suite.name)
  );

  return (
    <div className="p-4 md:p-10 space-y-12">
       <PageHeader
        title="Marketplace"
        description="Discover and add powerful AI apps to your workspace. Each app is a specialized tool designed to automate a specific part of your workflow."
        icon={<LayoutGrid className="h-8 w-8" />}
      >
        <div className="relative max-w-lg w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search all apps..."
                className="pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
      </PageHeader>
        
      {suitesToDisplay.map(suite => {
          const suiteTools = filteredTools.filter(t => t.suite === suite.name);
          if (suiteTools.length === 0) return null;
          
          return (
            <section key={suite.id}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                    <suite.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-heading">{suite.name}</h2>
                  <p className="text-muted-foreground">{suite.description}</p>
                </div>
              </div>
              
              <Carousel
                opts={{
                  align: "start",
                  dragFree: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {suiteTools.map(tool => (
                    <CarouselItem key={tool.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                       <div className="p-1 h-full">
                         <DashboardServiceCard 
                            tool={tool}
                            isAdded={addedApps.includes(tool.id)}
                            setIsAdded={(isAdded) => handleSetIsAdded(tool.id, isAdded)}
                            connectionRequired={appsThatNeedConnection[tool.id]}
                        />
                       </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex" />
                <CarouselNext className="hidden lg:flex" />
              </Carousel>

              <Separator className="mt-12" />
            </section>
          )
      })}

      {searchTerm && suitesToDisplay.length === 0 && (
          <div className="text-center py-16 text-muted-foreground col-span-full">
              <p>No apps or suites found for your search criteria.</p>
          </div>
      )}
    </div>
  );
}
