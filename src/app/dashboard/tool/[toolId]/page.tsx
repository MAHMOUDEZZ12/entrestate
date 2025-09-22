
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
import { notFound, useParams } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';


const ToolPage = () => {
  const params = useParams();
  const toolId = params.toolId as string;
  const [tool, setTool] = React.useState<Feature | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<any | null>(null);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const { toast } = useToast();
  const [filePayload, setFilePayload] = React.useState<Record<string, any>>({});

  React.useEffect(() => {
    const currentTool = clientTools.find((t) => t.id === toolId);
    setTool(currentTool);
  }, [toolId]);

  const getToolSchema = (tool: Feature | undefined) => {
    if (!tool) return z.object({});
    const shape = tool.creationFields.reduce((acc, field) => {
      if (field.type === 'button' || field.type === 'group-header' || field.type === 'file') return acc;
       let fieldSchema: z.ZodTypeAny;

        if (field.type === 'number') {
            fieldSchema = z.string().min(1, `${field.name} is required.`).refine(val => !isNaN(parseFloat(val)), { message: "Must be a valid number." }).transform(Number);
        } else {
             fieldSchema = z.string().min(1, `${field.name} is required.`);
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
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
     defaultValues: React.useMemo(() => {
        return tool?.creationFields.reduce((acc, field) => {
            if (field.type !== 'button' && field.type !== 'group-header' && !field.hidden) {
                (acc as any)[field.id] = field.value || (field.type === 'select' ? (field.options?.[0] || '') : '');
            }
            return acc;
        }, {})
     }, [tool])
  });

  React.useEffect(() => {
     reset(tool?.creationFields.reduce((acc, field) => {
        if (field.type !== 'button' && field.type !== 'group-header' && !field.hidden) {
             (acc as any)[field.id] = field.value || (field.type === 'select' ? (field.options?.[0] || '') : '');
        }
        return acc;
    }, {}));
  }, [tool, reset]);


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
        let payload: Record<string, any> = {...data, ...filePayload};
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: Field) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      if (field.multiple) {
          const uris = await filesToDataUris(files);
          setFilePayload(prev => ({...prev, [field.id]: uris}));
      } else {
          const uri = await fileToDataUri(files[0]);
          setFilePayload(prev => ({...prev, [field.id]: uri}));
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
        <div key={field.id} className={cn("space-y-2", "md:col-span-2" )}>
        <Label htmlFor={field.id} className="font-semibold">{field.name}</Label>
        <Controller
            name={field.id as any}
            control={control}
            render={({ field: { onChange, onBlur, value, name, ref } }) => {
                if (field.type === 'textarea') {
                    return <Textarea id={field.id} placeholder={field.placeholder} onChange={onChange} value={value || ''} onBlur={onBlur} name={name} ref={ref} />;
                }
                 if (field.type === 'select') {
                    return (
                        <Select onValueChange={onChange} defaultValue={value || field.options?.[0]}>
                            <SelectTrigger id={field.id}>
                                <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {field.options?.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    );
                }
                if (field.type === 'file') {
                    return <Input id={field.id} type="file" multiple={field.multiple} onChange={(e) => handleFileChange(e, field)} />
                }
                return <Input id={field.id} type={field.type === 'number' ? 'number' : 'text'} placeholder={field.placeholder} onChange={onChange} value={value || ''} onBlur={onBlur} name={name} ref={ref} />
            }}
            />
        <p className="text-xs text-muted-foreground">{field.description}</p>
        {fieldError && <p className="text-sm text-destructive">{fieldError.message as string}</p>}
        </div>
    );
  };
  
  return (
    <main className="p-4 md:p-10 space-y-8">
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
       <PageHeader
            title={tool.title}
            description={tool.description}
            icon={React.cloneElement(tool.icon, { className: 'h-8 w-8' })}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card>
                <form onSubmit={handleSubmit(handleGeneration)}>
                    <CardHeader>
                        <CardTitle>Configuration</CardTitle>
                        <CardDescription>Provide the necessary inputs for the AI.</CardDescription>
                    </CardHeader>
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
                            Generating...
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
            
            <Card>
                 <CardHeader>
                    <CardTitle>Result</CardTitle>
                    <CardDescription>The AI-generated output will appear here.</CardDescription>
                </CardHeader>
                <CardContent className="min-h-[400px]">
                    {isLoading && (
                        <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                            <div>
                                <Loader2 className="h-10 w-10 animate-spin text-primary mb-2 mx-auto" />
                                <p>The AI is working...</p>
                            </div>
                        </div>
                    )}
                    {error && !result && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {result && tool.renderResult && (
                        <div>
                            {tool.renderResult(result, toast)}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </main>
  );
}

export default ToolPage;
