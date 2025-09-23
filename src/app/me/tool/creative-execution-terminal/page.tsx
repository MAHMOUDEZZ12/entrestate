'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2, Sparkles, AlertCircle, Terminal, Play, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { useAuth } from '@/hooks/useAuth';

const ToolPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<string[]>([]);
  const [input, setInput] = useState('// Welcome to the Creative Execution Terminal\n// Describe your creative task below.\n\n// Example: Generate 3 variations of a social media ad for a "Luxury 2BR Penthouse in Downtown".\n');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // You might want to load a default script or last session here
  }, []);

  useEffect(() => {
    // A simple typewriter effect for the placeholder
    if (isMounted) {
      // Logic for placeholder can go here if needed
    }
  }, [isMounted]);

  const handleExecute = async () => {
    setIsLoading(true);
    setError(null);
    setResult(prev => [...prev, `> Executing: ${input.split('\n')[2]}`]);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResult(prev => [...prev, '✅ Task completed successfully. 3 assets generated.']);
    setIsLoading(false);
  };

  return (
    <main className="p-4 md:p-10 space-y-8 container mx-auto">
      <PageHeader
        title="Creative Execution Terminal"
        description="The execution engine for complex creative tasks. Describe your task and let the AI handle it."
        icon={<Terminal />}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Task Definition</CardTitle>
            <CardDescription>Write your creative brief or task in the editor below. Use comments for context.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your creative task..."
              className="font-mono h-64 bg-muted/50"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleExecute} disabled={isLoading} size="lg">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
              Execute Task
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Execution Log</CardTitle>
            <CardDescription>Real-time output from the creative execution engine.</CardDescription>
          </CardHeader>
          <CardContent className="bg-black text-white font-mono text-sm rounded-md p-4 h-80 overflow-y-auto">
            {result.map((line, index) => (
              <p key={index} className={line.startsWith('>') ? 'text-cyan-400' : 'text-green-400'}>{line}</p>
            ))}
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ToolPage;
