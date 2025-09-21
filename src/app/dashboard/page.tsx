
'use client';

import React, from 'react';
import Link from 'next/link';
import { ArrowRight, PlusCircle, GanttChartSquare, LayoutGrid } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { tools, Feature } from '@/lib/tools-client';
import { Button } from '@/components/ui/button';
import { useTabManager } from '@/context/TabManagerContext';
import { useRouter } from 'next/navigation';

const AppIcon = ({ tool, onOpen }: { tool: Feature, onOpen: (tool: Feature) => void }) => {
    return (
        <button 
            onClick={() => onOpen(tool)}
            className="flex flex-col items-center justify-center text-center gap-2 group"
            aria-label={`Open ${tool.title}`}
        >
            <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-200" 
                style={{ backgroundColor: tool.color }}
            >
                {React.cloneElement(tool.icon, { className: 'h-10 w-10' })}
            </div>
            <p className="text-sm font-medium text-foreground truncate w-24">{tool.title}</p>
        </button>
    )
}

export default function DashboardPage() {
  const [addedApps, setAddedApps] = React.useState<string[]>([]);
  const [isClient, setIsClient] = React.useState(false);
  const router = useRouter();
  const { addTab } = useTabManager();

  React.useEffect(() => {
    // This component uses localStorage, so we need to ensure it only runs on the client.
    setIsClient(true);
    const savedState = localStorage.getItem('addedApps');
    if (savedState) {
        setAddedApps(JSON.parse(savedState));
    }
  }, []);
  
  const handleOpenApp = (tool: Feature) => {
    addTab({ href: tool.href, label: tool.title });
    router.push(tool.href);
  }

  const myApps = React.useMemo(() => {
    if (!isClient) return [];
    return tools.filter(tool => addedApps.includes(tool.id));
  }, [addedApps, isClient]);

  return (
    <div className="p-4 md:p-10 space-y-8">
       <PageHeader
        title="Home"
        description="Your workspace. Launch apps, run flows, and manage your real estate universe."
      >
        <Link href="/dashboard/dev-admin">
            <Button variant="outline">
                <GanttChartSquare className="mr-2 h-4 w-4" />
                Dev Admin
            </Button>
        </Link>
      </PageHeader>
        
       <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-x-4 gap-y-8">
            {isClient && myApps.map(tool => (
                <AppIcon key={tool.id} tool={tool} onOpen={handleOpenApp} />
            ))}
             <Link href="/dashboard/marketing" className="flex flex-col items-center justify-center text-center gap-2 group">
                 <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-muted/50 border-2 border-dashed group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                    <PlusCircle className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors truncate w-24">Add Apps</p>
            </Link>
       </div>
       
       {isClient && myApps.length === 0 && (
         <div className="text-center py-16 border-2 border-dashed rounded-lg">
             <LayoutGrid className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold">Your Workspace is Empty</h3>
            <p className="text-muted-foreground mt-2 mb-6">Add apps from the App Store to get started.</p>
             <Link href="/dashboard/marketing">
                <Button>
                    Go to App Store
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
        </div>
       )}
    </div>
  );
}
