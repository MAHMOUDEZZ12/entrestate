
'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Feature, Field } from '@/lib/tools-client.tsx';
import { tools as clientTools, fileToDataUri, filesToDataUris } from '@/lib/tools-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2, Sparkles, AlertCircle, Upload, Info, PlusCircle, CreditCard, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Confetti } from '@/components/confetti';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { track } from '@/lib/events';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// NOTE: This is a simplified page structure that directly uses the `ToolPage` logic
// but is defined in its own file. In a real-world scenario, this page could have a
// completely unique layout and logic tailored to the Deal Analyzer tool.

const ToolPage = () => {
  const toolId = 'deal-analyzer'; // Hardcoded for this specific tool page
  const [tool, setTool] = React.useState<Feature | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<any | null>(null);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    const currentTool = clientTools.find((t) => t.id === toolId);
    setTool(currentTool);
  }, [toolId]);

  const getToolSchema = (tool: Feature | undefined) => {
    if (!tool) return z.object({});
    const shape = tool.creationFields.reduce((acc, field) => {
      if (field.type === 'button' || field.type === 'group-header') return acc;
       let fieldSchema: z.ZodTypeAny;

        if (field.type === 'number') {
            fieldSchema = z.string().min(1, `${field.name} is required`).refine(val => !isNaN(Number(val)), { message: "Must be a number" }).transform(Number);
        } else {
             fieldSchema = z.string().min(1, `${field.name} is required`);
        }
      (acc as any)[field.id] = fieldSchema;
      return acc;
    }, {} as Record<string, z.ZodTypeAny>);
    return z.object(shape);
  };
  
  const schema = React.useMemo(() => getToolSchema(tool), [tool]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
     defaultValues: tool?.creationFields.reduce((acc, field) => {
      if (field.type !== 'button' && field.type !== 'group-header' && !field.hidden) {
        (acc as any)[field.id] = field.value || '';
      }
      return acc;
    }, {})
  });

  if (!tool) {
    return (
        <div className="flex h-[80vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }
  
  const handleGeneration = async (data: Record<string, any>) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setShowConfetti(false);

    try {
        let payload: Record<string, any> = {};
        for (const field of tool.creationFields) {
            const fieldId = field.id;
            if (data.hasOwnProperty(fieldId) && data[fieldId]) {
              payload[fieldId] = data[fieldId];
            }
        }
        
        track('tool_run_started', { toolId });

        const response = await fetch('/api/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ toolId, payload }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.error || 'An API error occurred.');
        }
        
        setResult(responseData);
        setShowConfetti(true);
        track('tool_run_succeeded', { toolId });
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'An unexpected error occurred.');
      toast({
          title: "Generation Failed",
          description: e.message,
          variant: 'destructive',
      });
      track('tool_run_failed', { toolId, error: e.message });
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderField = (field: Field) => {
    if (field.hidden) return null;
    
    if (field.type === 'group-header') {
        return (
            <div key={field.id} className="md:col-span-2 mt-4 first:mt-0">
                <h3 className="text-lg font-semibold text-foreground">{field.name}</h3>
                <Separator />
            </div>
        );
    }

    const fieldError = errors[field.id];

    return (
        <div key={field.id} className={cn("space-y-2", field.id === 'propertyAddress' && 'md:col-span-2')}>
        <Label htmlFor={field.id} className="font-semibold">{field.name}</Label>
        <Controller
            name={field.id as any}
            control={control}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Input id={field.id} type={field.type === 'number' ? 'number' : 'text'} placeholder={field.placeholder} onChange={onChange} value={value || ''} onBlur={onBlur} name={name} ref={ref} />
            )}
            />
        {fieldError && <p className="text-sm text-destructive">{fieldError.message as string}</p>}
        </div>
    );
  };
  
  return (
    <main className="p-4 md:p-10 space-y-8">
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      
        <>
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="p-3 rounded-lg w-fit text-white shrink-0" style={{ backgroundColor: tool.color }}>
                    {React.cloneElement(tool.icon, { className: 'h-8 w-8' })}
                    </div>
                    <div>
                    <CardTitle className="text-3xl font-heading">{tool.title}</CardTitle>
                    <CardDescription className="text-md">{tool.description}</CardDescription>
                    </div>
                </div>
                </CardHeader>
                <form onSubmit={handleSubmit(handleGeneration)}>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tool.creationFields.map(renderField)}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing...
                        </>
                    ) : (
                        <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        {tool.cta}
                        </>
                    )}
                    </Button>
                </CardFooter>
                </form>
            </Card>
            
            {error && !result && (
                <Alert variant="destructive" className="max-w-4xl mx-auto">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {result && tool.renderResult && (
                <div className="max-w-4xl mx-auto">
                    {tool.renderResult(result, toast)}
                </div>
            )}
        </>
    </main>
  );
}

export default ToolPage;
