
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Loader2, BrainCircuit, Bot } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { getCrmMemory } from '@/ai/flows/listing-crm/get-crm-memory';

export default function CrmAssistantPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const [clientName, setClientName] = useState('');
  const [query, setQuery] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !query) {
      toast({ title: "All fields are required", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
        const response = await getCrmMemory({ clientName, query });
        setResult(response);
        toast({ title: "Memory Retrieved", description: "The AI has summarized its knowledge of this client." });
    } catch(e: any) {
         toast({ title: "Error", description: e.message, variant: 'destructive' });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="CRM Memory Assistant"
        description="Query your AI's memory about any client to get instant summaries of past interactions, preferences, and potential next steps."
        icon={<BrainCircuit className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Query Client Memory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input id="clientName" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g., 'John Doe'" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="query">Your Question</Label>
                 <Input id="query" value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g., 'What was the last property I showed him?'" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {isLoading ? 'Searching Memory...' : 'Ask AI'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Summary</CardTitle>
            <CardDescription>The AI's answer based on your private data will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px] flex items-center justify-center bg-muted/50 rounded-lg">
            {isLoading ? (
                <div className="text-center text-muted-foreground">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mb-2 mx-auto" />
                    <p>Searching client interactions...</p>
                </div>
            ) : result ? (
                 <div className="space-y-4 text-sm w-full">
                     <div className="flex justify-between items-center">
                        <p className="font-semibold">AI's Confidence in this answer:</p>
                        <Badge variant={result.confidenceScore > 0.8 ? 'default' : 'secondary'}>
                            {(result.confidenceScore * 100).toFixed(0)}%
                        </Badge>
                     </div>
                     <p className="p-4 bg-background rounded-md border">{result.summary}</p>
                 </div>
            ) : (
                <div className="text-center text-muted-foreground">
                    <Bot className="h-12 w-12 mx-auto mb-2" />
                    <p>AI's response will be displayed here.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
