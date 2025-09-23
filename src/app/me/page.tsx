
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, PlusCircle, GanttChartSquare, LayoutGrid } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { tools, Feature } from '@/lib/tools-client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useSpotlight } from '@/context/SpotlightContext';
import { marketingSuites } from '@/lib/suites-data';
import { pricingData } from '@/lib/pricing-data';

const AppIcon = ({ tool, onOpen }: { tool: Feature; onOpen: (tool: Feature) => void }) => {
  const { setSpotlight, clearSpotlight } = useSpotlight();
  return (
    <div onMouseEnter={() => setSpotlight(tool)} onMouseLeave={clearSpotlight}>
      <Link
        href={tool.href}
        className="flex flex-col items-center justify-center text-center gap-2 group"
        aria-label={`Open ${tool.title}`}
        onClick={(e) => {
          e.preventDefault();
          onOpen(tool);
        }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-200"
          style={{ backgroundColor: tool.color }}
        >
          {React.cloneElement(tool.icon, { className: 'h-8 w-8' })}
        </div>
        <p className="text-xs font-medium text-foreground truncate w-20">{tool.title}</p>
      </Link>
    </div>
  );
};


export default function MePage() {
  const [isClient, setIsClient] = useState(false);
  const { user } = useAuth();
  
  // SIMULATION: Assume the user has purchased the "Super Agent Suite"
  const mySuites = ['Super Agent Suite']; 

  const myApps = React.useMemo(() => {
    if (!isClient) return [];
    
    // Get all feature titles from the purchased suites
    const myFeatures = mySuites.flatMap(suiteName => {
        const plan = pricingData.plans.find(p => p.name === suiteName);
        return plan ? plan.features : [];
    });

    // Filter tools to get the full tool object for each owned feature
    return tools.filter(tool => myFeatures.includes(tool.title));
  }, [isClient, mySuites]);


  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOpenApp = (tool: Feature) => {
    // This logic should now be handled by the GlobalSearch or a similar component
    window.location.href = tool.href;
  };

  const myAppsBySuite = marketingSuites.map(suite => {
      return {
          ...suite,
          apps: tools.filter(tool => tool.suite === suite.name)
      }
  }).filter(suite => mySuites.includes(suite.name));
  

  return (
    <div className="p-4 md:p-10 space-y-8 container mx-auto">
       <PageHeader
        title="My Workspace"
        description="Launch apps, run flows, and manage your real estate universe."
      >
            <Link href="/gem">
            <Button variant="outline">
                <GanttChartSquare className="mr-2 h-4 w-4" />
                Gem Admin
            </Button>
            </Link>
      </PageHeader>
      
      {myAppsBySuite.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <LayoutGrid className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold">Your Workspace is Empty</h3>
                <p className="text-muted-foreground mt-2 mb-6">Purchase a suite from the Marketplace to get started.</p>
                <Link href="/apps">
                    <Button>
                        Go to Marketplace
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
      ) : (
        <div className="space-y-8">
            {myAppsBySuite.map(suite => (
                <Card key={suite.id}>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/10 text-primary rounded-lg">
                                {React.createElement(suite.icon, { className: 'h-6 w-6' })}
                            </div>
                            <div>
                               <CardTitle className="text-2xl">{suite.name}</CardTitle>
                               <CardDescription>{suite.description}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-10 gap-x-4 gap-y-6">
                            {suite.apps.map(app => (
                                <AppIcon key={app.id} tool={app} onOpen={handleOpenApp} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
             <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                     <Link href="/apps" className="flex flex-col items-center justify-center gap-2 group">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-muted/50 border-2 border-dashed group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                        <PlusCircle className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Add Suites from Marketplace</p>
                    </Link>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
