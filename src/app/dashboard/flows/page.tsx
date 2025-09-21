
'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Workflow, Plus, Play, Sparkles, ArrowRight, CheckCircle, ExternalLink, Settings2, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { tools, Feature } from '@/lib/tools-client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTabManager } from '@/context/TabManagerContext';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface FlowStep {
    id: string;
    type: 'trigger' | 'action';
    appId: string | null;
    appName: string | null;
    appIcon?: React.ReactNode;
    appColor?: string;
}

const AppSelectionModal = ({ onSelectApp, installedApps }: { onSelectApp: (app: Feature) => void, installedApps: Feature[] }) => {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Select an App</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4 py-4 max-h-[60vh] overflow-y-auto">
                {installedApps.map(app => (
                    <DialogTrigger asChild key={app.id}>
                        <button onClick={() => onSelectApp(app)} className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors text-center">
                             <div className="p-3 rounded-lg text-white w-fit" style={{ backgroundColor: app.color }}>
                                {React.cloneElement(app.icon, { className: 'h-6 w-6' })}
                            </div>
                            <p className="text-xs font-medium truncate w-24">{app.title}</p>
                        </button>
                    </DialogTrigger>
                ))}
            </div>
        </DialogContent>
    );
}


export default function FlowsPage() {
  const [installedApps, setInstalledApps] = useState<Feature[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<FlowStep[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    const savedAppIds = JSON.parse(localStorage.getItem('addedApps') || '[]');
    const userApps = tools.filter(tool => savedAppIds.includes(tool.id));
    setInstalledApps(userApps);
  }, []);

  const handleAddStep = (type: 'trigger' | 'action') => {
      const newStep: FlowStep = {
          id: `step-${Date.now()}`,
          type,
          appId: null,
          appName: null
      };
      if (type === 'trigger' && currentFlow.some(s => s.type === 'trigger')) {
          toast({ title: "Trigger already exists", description: "A flow can only have one trigger.", variant: "destructive" });
          return;
      }
      setCurrentFlow(prev => [...prev, newStep]);
  }

  const handleSelectAppForStep = (stepId: string, app: Feature) => {
      setCurrentFlow(prev => prev.map(step => 
          step.id === stepId 
          ? { ...step, appId: app.id, appName: app.title, appIcon: app.icon, appColor: app.color }
          : step
      ));
  }
  
  const handleRunFlow = () => {
    if (currentFlow.some(step => !step.appId)) {
        toast({ title: "Incomplete Flow", description: "Please select an app for every step in the flow.", variant: "destructive"});
        return;
    }
    toast({ title: "Running Flow...", description: "Your custom automation has started. You will be notified upon completion." });
  }

  if (!isClient) {
      return null;
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Flow Builder"
        description="Create your own automations. Connect your apps together to build powerful, custom workflows, just like Zapier."
        icon={<Workflow className="h-6 w-6" />}
      >
        <div className="flex gap-2">
            <Button variant="outline"><Save className="mr-2 h-4 w-4" /> Save Flow</Button>
            <Button onClick={handleRunFlow}><Play className="mr-2 h-4 w-4"/> Run Flow</Button>
        </div>
      </PageHeader>
      <div className="p-4 md:p-6 space-y-8">
        <Card className="w-full max-w-4xl mx-auto border-dashed">
            <CardContent className="p-6 md:p-10">
                <div className="flex flex-col items-center gap-4">
                    {currentFlow.length === 0 && (
                         <div className="text-center">
                            <p className="text-lg font-semibold">Start building your flow</p>
                            <p className="text-muted-foreground">Add a trigger to begin.</p>
                        </div>
                    )}

                    {currentFlow.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="w-full max-w-md">
                                        <Card className={cn(
                                            "hover:border-primary/50 hover:shadow-lg transition-all",
                                            step.appId && "border-primary/30"
                                        )}>
                                            <CardHeader>
                                                 <CardTitle className="flex items-center gap-3">
                                                    {step.appId ? (
                                                        <div className="p-3 rounded-lg text-white" style={{ backgroundColor: step.appColor }}>
                                                            {React.cloneElement(step.appIcon as React.ReactElement, { className: 'h-6 w-6' })}
                                                        </div>
                                                    ) : (
                                                         <div className="p-3 bg-muted rounded-lg text-muted-foreground">
                                                            <Sparkles className="h-6 w-6" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{step.type}</p>
                                                        <p className="text-xl font-semibold text-left">{step.appName || `Select ${step.type}`}</p>
                                                    </div>
                                                </CardTitle>
                                            </CardHeader>
                                        </Card>
                                    </button>
                                </DialogTrigger>
                                <AppSelectionModal installedApps={installedApps} onSelectApp={(app) => handleSelectAppForStep(step.id, app)} />
                            </Dialog>

                             {index < currentFlow.length - 1 && (
                                <div className="h-8 w-px bg-border my-2" />
                            )}
                        </React.Fragment>
                    ))}

                    <div className="flex flex-col gap-2 w-full max-w-md mt-4">
                         {currentFlow.length === 0 && (
                             <Button onClick={() => handleAddStep('trigger')} variant="outline" className="w-full border-dashed">
                                <Plus className="mr-2 h-4 w-4"/> Add Trigger
                            </Button>
                         )}
                         {currentFlow.length > 0 && (
                            <Button onClick={() => handleAddStep('action')} variant="outline" className="w-full border-dashed">
                                <Plus className="mr-2 h-4 w-4"/> Add Step
                            </Button>
                         )}
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
