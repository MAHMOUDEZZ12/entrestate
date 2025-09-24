
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Circle, CheckCircle, Play, Users, Wand2, Box, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { track } from '@/lib/events';
import { Label } from '@/components/ui/label';
import { MetaAutoPilotInput, MetaAutoPilotOutput } from '@/ai/flows/types';
import { runMetaAutoPilot } from '@/ai/flows/meta-pilot/meta-auto-pilot';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';

type Status = 'pending' | 'running' | 'completed' | 'error';

interface Step {
  id: string;
  title: string;
  description: string;
  status: Status;
  icon: React.ReactNode;
}

const INITIAL_STEPS: Step[] = [
  { id: 'audience', title: 'Suggest Audience', description: 'AI is analyzing the project to define the ideal target audience.', status: 'pending', icon: <Users /> },
  { id: 'creative', title: 'Generate Creatives', description: 'AI is designing ad copy and visuals from the project assets.', status: 'pending', icon: <Wand2 /> },
  { id: 'assembly', title: 'Assemble Campaign', description: 'AI is building the final campaign structure, ad sets, and budget.', status: 'pending', icon: <Box /> },
];

export default function MetaAutoPilotPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [workflow, setWorkflow] = useState<Step[]>(INITIAL_STEPS);
  const [finalResult, setFinalResult] = useState<MetaAutoPilotOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExecute = async () => {
    if (!user) {
      toast({ title: 'Authentication Required', description: 'Please log in to run the Auto Pilot.', variant: 'destructive'});
      return;
    }
    if (!selectedProject || !selectedGoal) {
        toast({ title: 'Missing Information', description: 'Please select a project and a campaign goal.', variant: 'destructive'});
        return;
    }

    setIsExecuting(true);
    setFinalResult(null);
    setError(null);
    setWorkflow(INITIAL_STEPS); // Reset workflow on new execution
    track('autopilot_execution_started', { projectId: selectedProject, goal: selectedGoal });

    // This is a simulation of the onDelta callback from the backend
    const runStep = (index: number) => {
      if (index >= workflow.length) {
        return;
      }
      
      setWorkflow(prev => prev.map((step, i) => i === index ? { ...step, status: 'running' } : step));
      
      // Simulate variable step time
      setTimeout(() => {
        setWorkflow(prev => {
            const currentStep = prev.find(s => s.status === 'running');
            if (currentStep?.id === workflow[index].id) {
                 return prev.map((step, i) => i === index ? { ...step, status: 'completed' } : step)
            }
            return prev;
        });
        runStep(index + 1);
      }, 1500 + Math.random() * 500); 
    };

    runStep(0);

    try {
        const payload: MetaAutoPilotInput = { projectId: selectedProject, campaignGoal: selectedGoal };
        
        const data = await runMetaAutoPilot(payload);

        setFinalResult(data);
        track('autopilot_execution_succeeded', { projectId: selectedProject });
        toast({ title: 'Autopilot Complete!', description: 'Your campaign plan is ready for review.' });
        setWorkflow(prev => prev.map(step => ({...step, status: 'completed'})));

    } catch (e: any) {
        setError(e.message);
        setWorkflow(prev => prev.map(step => ({...step, status: (step.status === 'pending' || step.status === 'running' ? 'error' : step.status) })));
        toast({ title: 'Execution Failed', description: e.message, variant: 'destructive' });
        track('autopilot_execution_failed', { projectId: selectedProject, error: e.message });
    } finally {
        setIsExecuting(false);
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'running': return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-destructive" />;
      default: return <Circle className="h-5 w-5 text-muted-foreground/50" />;
    }
  };

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Property Marketer AI"
        description="The one-click command center to create and launch a complete Meta ad campaign."
        icon={<Sparkles className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        <Card>
            <CardHeader>
                <CardTitle>1. Define Your Objective</CardTitle>
                <CardDescription>Tell the AI what you want to achieve.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="projectId">Project to Promote</Label>
                    <Select value={selectedProject} onValueChange={setSelectedProject} disabled={isExecuting}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a project..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="dxboffplan-emaar-beachfront">Emaar Beachfront</SelectItem>
                            <SelectItem value="dxboffplan-damac-lagoons">Damac Lagoons</SelectItem>
                            <SelectItem value="dxboffplan-sobha-hartland-2">Sobha Hartland II</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="campaignGoal">Primary Campaign Goal</Label>
                    <Select value={selectedGoal} onValueChange={setSelectedGoal} disabled={isExecuting}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a goal..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Lead Generation to Landing Page">Lead Generation (Website)</SelectItem>
                            <SelectItem value="Lead Generation to WhatsApp">Lead Generation (WhatsApp)</SelectItem>
                            <SelectItem value="Brand Awareness">Brand Awareness</SelectItem>
                            <SelectItem value="Website Traffic">Website Traffic</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter>
                 <Button onClick={handleExecute} disabled={isExecuting || !selectedProject || !selectedGoal} className="w-full" size="lg">
                    {isExecuting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                    {isExecuting ? 'Autopilot Running...' : 'Launch Autopilot'}
                </Button>
            </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>2. Monitor Execution</CardTitle>
                <CardDescription>The AI will perform each step in sequence.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {workflow.map((step) => (
                        <div key={step.id} className="flex items-start gap-4">
                            <div>{getStatusIcon(step.status)}</div>
                            <div className="flex-1">
                                <p className={cn("font-medium", step.status !== 'pending' && "text-foreground")}>{step.title}</p>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                            <div className="p-2 bg-muted rounded-md text-muted-foreground">{step.icon}</div>
                        </div>
                    ))}
                </div>
                 {finalResult && (
                    <div className="mt-4 pt-4 border-t">
                        <h4 className="font-semibold text-green-600 mb-2">Execution Complete!</h4>
                        <p className="text-sm text-muted-foreground">The campaign plan has been assembled and is ready to review. The final campaign plan ID is <span className="font-mono bg-muted px-1 py-0.5 rounded">{finalResult.finalCampaignId}</span>.</p>
                        <Button className="mt-4" size="sm" variant="outline">View Full Campaign Plan</Button>
                    </div>
                )}
                 {error && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Execution Failed</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
