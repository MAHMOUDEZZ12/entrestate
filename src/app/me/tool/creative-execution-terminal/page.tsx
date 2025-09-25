
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
import { generateAdFromBrochure } from '@/ai/flows/meta-pilot/generate-ad-from-brochure';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type LogEntry = {
    type: 'command' | 'status' | 'result' | 'error';
    message: string;
    data?: any;
};

const ToolPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [logs, setLogs] = React.useState<LogEntry[]>([]);
  const [input, setInput] = useState('// Welcome to the Creative Execution Terminal\n// Describe your creative task below.\n\n// Example: Generate 3 ad copy variations and a hero image for a "Luxury 2BR Penthouse in Downtown".\n');
  const [isMounted, setIsMounted] = useState(false);
  const logContainerRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (logContainerRef.current) {
        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (log: LogEntry) => {
    setLogs(prev => [...prev, log]);
  };


  const handleExecute = async () => {
    if (!user) {
        toast({ title: "Not Authenticated", variant: "destructive"});
        return;
    }
    
    setIsLoading(true);
    addLog({ type: 'command', message: `Executing task: "${input.split('\n')[2]}"`});

    // A simple parser for the example command
    const focusMatch = input.match(/"([^"]*)"/);
    const focusArea = focusMatch ? focusMatch[1] : "A luxury property";

    try {
      addLog({ type: 'status', message: 'Running AI flow: generateAdFromBrochure...'});
      const result = await generateAdFromBrochure({
        focusArea,
        projectName: focusArea,
        toneOfVoice: 'Luxury & Exclusive'
      });
      addLog({ type: 'status', message: '✅ Task completed successfully. 2 assets generated.'});
      addLog({ type: 'result', message: 'Generated Ad Copy:', data: result.adCopy });
      addLog({ type: 'result', message: 'Generated Ad Design:', data: result.adDesign });

    } catch (e: any) {
        addLog({ type: 'error', message: `Execution failed: ${e.message}` });
        toast({ title: 'Execution Failed', description: e.message, variant: 'destructive'});
    } finally {
        setIsLoading(false);
    }
  };
  
  const renderLogData = (log: LogEntry) => {
    if (!log.data) return null;
    if (typeof log.data === 'string' && log.data.startsWith('data:image')) {
        return <div className="mt-2 pl-4"><Image src={log.data} alt="Generated Image" width={200} height={200} className="rounded-md" /></div>
    }
    return <pre className="mt-2 pl-4 text-xs text-white/70 whitespace-pre-wrap">{log.data}</pre>
  }

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
          <CardContent>
             <div ref={logContainerRef} className="bg-black text-white font-mono text-sm rounded-md p-4 h-80 overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="mb-2">
                    <p className={cn(
                        log.type === 'command' && 'text-cyan-400',
                        log.type === 'status' && 'text-green-400',
                        log.type === 'result' && 'text-white',
                        log.type === 'error' && 'text-red-500',
                    )}>
                        {log.type !== 'command' && <span className="mr-2">{'>'}</span>}
                        {log.message}
                    </p>
                    {renderLogData(log)}
                   </div>
                ))}
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ToolPage;
