
'use client';

import React from 'react';
import { useForm, Controller, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Feature, Field } from '@/lib/tools-client';
import { tools as clientTools, getToolCreationFields, getToolResultRenderer } from '@/lib/tools-client';
import { fileToDataUri, filesToDataUris } from '@/lib/file-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2, Sparkles, AlertCircle, Wand2, Copy, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Confetti } from '@/components/confetti';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { track } from '@/lib/events';
import { notFound, useParams, useRouter } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/hooks/useAuth';


const copyToClipboard = (text: string, toast: (options: any) => void) => {
    navigator.clipboard.writeText(text);
    toast({
        title: "Copied to clipboard!",
        description: "The HTML code has been copied successfully.",
    });
};


const ToolPage = () => {
  const params = useParams();
  const router = useRouter();
  const toolId = params.toolId as string;
  const [tool, setTool] = React.useState<Feature | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<any | null>(null);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const { toast } = useToast();
  const [filePayload, setFilePayload] = React.useState<Record<string, any>>({});
  const { user } = useAuth();
  
  // Specific state for landing page tool to manage live preview
  const [liveHtml, setLiveHtml] = React.useState<string | null>(null);

  React.useEffect(() => {
    const currentTool = clientTools.find((t) => t.id === toolId);
    setTool(currentTool);
  }, [toolId]);

  const getToolSchema = (tool: Feature | undefined) => {
    if (!tool || !tool.creationFields) return z.object({});
    const shape = getToolCreationFields(tool.id).reduce((acc, field) => {
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

  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
     defaultValues: React.useMemo(() => {
        if (!tool || !tool.creationFields) return {};
        return tool.creationFields.reduce((acc, field) => {
            if (field.type !== 'button' && field.type !== 'group-header' && !field.hidden) {
                (acc as any)[field.id] = field.value || (field.type === 'select' ? (field.options?.[0] || '') : '');
            }
            return acc;
        }, {});
     }, [tool])
  });

  React.useEffect(() => {
    if (!tool || !tool.creationFields) return;
     reset(tool.creationFields.reduce((acc, field) => {
        if (field.type !== 'button' && field.type !== 'group-header' && !field.hidden) {
             (acc as any)[field.id] = field.value || (field.type === 'select' ? (field.options?.[0] || '') : '');
        }
        return acc;
    }, {} as any));
  }, [tool, reset]);


  if (!tool) {
    // Let's check if it's a valid, but non-UI tool
    const validTool = clientTools.find(t => t.id === toolId);
    if(validTool) {
       return (
        <div className="flex h-[80vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        );
    }
    notFound();
  }
  
  const handleGeneration = async (data: Record<string, any>) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setLiveHtml(null);
    setShowConfetti(false);
    
    if (!user) {
        toast({
            title: 'Authentication Required',
            description: 'Please log in to use the AI tools.',
            variant: 'destructive',
        });
        setIsLoading(false);
        return;
    }
    
    try {
        const idToken = await user.getIdToken();
        let payload: Record<string, any> = {...data, ...filePayload};
        track('tool_run_started', { toolId });

        const response = await fetch('/api/run', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`,
            },
            body: JSON.stringify({ toolId, payload }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.error || 'An API error occurred.');
        }
        
        setResult(responseData);

        // Special handling for landing page live preview
        if (toolId === 'landing-pages' && responseData.landingPageHtml) {
            setLiveHtml(responseData.landingPageHtml);
        }

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

    const fieldError = errors[field.id as keyof typeof errors];

    return (
        <div key={field.id} className={cn("space-y-2", "md:col-span-2" )}>
        <Label htmlFor={field.id} className="font-semibold">{field.name}</Label>
        <Controller
            name={field.id as Path<FormData>}
            control={control}
            render={({ field: { onChange, onBlur, value, name, ref } }) => {
                if (field.type === 'textarea') {
                    return <Textarea id={field.id} placeholder={field.placeholder} onChange={onChange} value={value as string || ''} onBlur={onBlur} name={name} ref={ref} />;
                }
                 if (field.type === 'select') {
                    return (
                        <Select onValueChange={onChange} defaultValue={value as string || field.options?.[0]}>
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
                return <Input id={field.id} type={field.type === 'number' ? 'number' : 'text'} placeholder={field.placeholder} onChange={onChange} value={value as string || ''} onBlur={onBlur} name={name} ref={ref} />
            }}
            />
        <p className="text-xs text-muted-foreground">{field.description}</p>
        {fieldError && <p className="text-sm text-destructive">{fieldError.message as string}</p>}
        </div>
    );
  };

  const handleStrategyChange = (headline: string, cta: string) => {
    if (!liveHtml) return;
    const doc = new DOMParser().parseFromString(liveHtml, 'text/html');
    const heroHeadline = doc.querySelector('h1');
    const heroCta = doc.querySelector('a.cta-button'); // Assuming a CTA button has this class

    if (heroHeadline) {
      heroHeadline.textContent = headline;
    }
    if (heroCta) {
      heroCta.textContent = cta;
    }
    setLiveHtml(doc.documentElement.outerHTML);
  };
  
  const LandingPageResult = ({ result }: { result: any }) => {
      if (!liveHtml) return null;

      return (
        <div className="space-y-4">
          <Alert>
            <Wand2 className="h-4 w-4" />
            <AlertTitle>Strategies & Live Preview</AlertTitle>
            <AlertDescription>
              Select a strategy to see it update on the live preview below.
            </AlertDescription>
          </Alert>

          <RadioGroup
            onValueChange={(value) => {
              const [headline, cta] = value.split('||');
              handleStrategyChange(headline, cta);
            }}
            defaultValue={`${result.headlineOptions[0].headline}||${result.headlineOptions[0].cta}`}
          >
            {result.headlineOptions.map((strategy: any) => (
              <Label
                key={strategy.id}
                htmlFor={strategy.id}
                className="block cursor-pointer rounded-lg border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/10"
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem
                    value={`${strategy.headline}||${strategy.cta}`}
                    id={strategy.id}
                  />
                  <div>
                    <p className="font-bold">
                      {strategy.strategy}:{' '}
                      <span className="font-normal">"{strategy.headline}"</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      CTA: "{strategy.cta}"
                    </p>
                  </div>
                </div>
              </Label>
            ))}
          </RadioGroup>

          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <iframe
                srcDoc={liveHtml}
                title="Landing Page Preview"
                className="h-[600px] w-full rounded-md border"
              />
            </CardContent>
             <CardFooter>
                 <Button onClick={() => copyToClipboard(liveHtml, toast)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy HTML
                 </Button>
            </CardFooter>
          </Card>
        </div>
      );
  }
  
  const renderResultContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <div>
                        <Loader2 className="h-10 w-10 animate-spin text-primary mb-2 mx-auto" />
                        <p>The AI is working...</p>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            );
        }
        
        const nextAction = result?.next_action;
        
        return (
            <div className="space-y-6">
                {!result ? (
                     <div className="flex items-center justify-center h-full text-center text-muted-foreground min-h-[300px]">
                        <p>The AI-generated output will appear here.</p>
                    </div>
                ) : tool.id === 'landing-pages' ? (
                    <LandingPageResult result={result} />
                ) : getToolResultRenderer(tool.id)(result, toast) ? (
                     getToolResultRenderer(tool.id)(result, toast)
                ) : (
                    <pre className="p-4 bg-muted rounded-md text-sm whitespace-pre-wrap max-h-[70vh] overflow-auto">{JSON.stringify(result, null, 2)}</pre>
                )}

                {nextAction && (
                    <Card className="bg-primary/10 border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                Next Step
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{nextAction.description}</p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => router.push(`/me/tool/${nextAction.toolId}`)}>
                                {nextAction.title}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
        );
  };


  return (
    <main className="p-4 md:p-10 space-y-8 container mx-auto">
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
                        <CardDescription>
                            Provide the necessary inputs for the AI.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {getToolCreationFields(tool.id).map(renderField)}
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
                    {renderResultContent()}
                </CardContent>
            </Card>
        </div>
    </main>
  );
}

export default ToolPage;
