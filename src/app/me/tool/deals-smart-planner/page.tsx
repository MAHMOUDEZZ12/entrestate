
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, AlertCircle, Bot, Wand2, MessageCircle, FileText, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { useAuth } from '@/hooks/useAuth';
import { dealsSmartPlanner } from '@/ai/flows/sales/deals-smart-planner';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

type PlanStep = {
    type: 'question' | 'action' | 'suggestion';
    title: string;
    description: string;
    actionable_item?: string;
    tool_id?: string;
};

const PlanStepCard = ({ step, onAction, onNext }: { step: PlanStep, onAction: (context: string) => void, onNext: (context: string) => void }) => {
  const [userInput, setUserInput] = useState('');

  const renderContent = () => {
    switch(step.type) {
      case 'question':
        return (
          <div className="space-y-4">
            <p>{step.description}</p>
            <Textarea 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Your answer..."
            />
            <Button onClick={() => onNext(userInput)} disabled={!userInput}>Submit Answer</Button>
          </div>
        );
      case 'action':
        return (
          <div className="space-y-4">
            <p>{step.description}</p>
            {step.actionable_item && (
              <Alert>
                <Wand2 className="h-4 w-4" />
                <AlertTitle>Actionable Item</AlertTitle>
                <AlertDescription className="whitespace-pre-wrap font-mono text-xs p-2 bg-muted rounded-md">
                  {step.actionable_item}
                </AlertDescription>
              </Alert>
            )}
            <div className="flex gap-2">
              {step.tool_id && (
                <Link href={`/me/tool/${step.tool_id}`}>
                  <Button variant="outline">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Go to {step.tool_id.replace(/-/g, ' ')}
                  </Button>
                </Link>
              )}
              <Button onClick={() => onNext('Task completed.')}>
                I've Done This <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
       case 'suggestion':
         return (
           <div className="space-y-4">
            <p>{step.description}</p>
            <div className="flex gap-2">
              <Button onClick={() => onAction(step.title)}><Sparkles className="mr-2 h-4 w-4"/>Let's do it</Button>
              <Button onClick={() => onNext('User wants another idea.')} variant="ghost">Give me another idea</Button>
            </div>
          </div>
         );
      default:
        return null;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{step.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
};


export default function DealsSmartPlannerPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [planHistory, setPlanHistory] = useState<PlanStep[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const getNextStep = async (goal: string, context?: string) => {
    setIsLoading(true);
    setError(null);
    if (!user) {
        toast({ title: "Authentication Required", variant: "destructive" });
        setIsLoading(false);
        return;
    }
    try {
      const response = await dealsSmartPlanner({ goal, userContext: context });
      setPlanHistory(prev => [...prev, response.nextStep]);
    } catch(e: any) {
       setError(e.message);
       toast({ title: "Planner Error", description: e.message, variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };

  const startPlan = (goal: string) => {
    setPlanHistory([]);
    getNextStep(goal);
  };
  
  const handleAction = (context: string) => {
    getNextStep(`Continue plan based on: "${context}"`, context);
  }

  return (
    <main className="p-4 md:p-10 space-y-8 container mx-auto">
       <PageHeader
            title="Sales AI Assistant"
            description="Your interactive AI partner for creating and executing winning deals, one step at a time."
            icon={<Sparkles />}
        />
        <div className="max-w-2xl mx-auto space-y-6">
            {isLoading && (
                 <div className="flex items-center justify-center h-40 text-center text-muted-foreground">
                    <div>
                        <Loader2 className="h-10 w-10 animate-spin text-primary mb-2 mx-auto" />
                        <p>The AI is planning your next move...</p>
                    </div>
                </div>
            )}

            {planHistory.length === 0 && !isLoading && (
                 <Card className="text-center p-8">
                    <CardHeader>
                        <Bot className="h-12 w-12 mx-auto text-primary" />
                        <CardTitle className="mt-4">Let's Plan a Deal</CardTitle>
                        <CardDescription>What is your primary objective right now?</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                       <Button onClick={() => startPlan("Follow up on a cold lead")}>
                            <MessageCircle className="mr-2 h-4 w-4" /> Revive a Cold Lead
                       </Button>
                       <Button onClick={() => startPlan("Find a deal for a new investor")}>
                            <FileText className="mr-2 h-4 w-4" /> Find a new Opportunity
                       </Button>
                    </CardContent>
                </Card>
            )}

            {planHistory.length > 0 && !isLoading &&
                 <PlanStepCard 
                    step={planHistory[planHistory.length - 1]}
                    onAction={handleAction}
                    onNext={(context) => getNextStep(planHistory[0]?.title || "Continue plan", context)}
                />
            }
            
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </div>
    </main>
  );
}
