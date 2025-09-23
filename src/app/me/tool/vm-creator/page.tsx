'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2, Sparkles, AlertCircle, Server } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { track } from '@/lib/events';
import { PageHeader } from '@/components/ui/page-header';
import { useAuth } from '@/hooks/useAuth';

const VmCreatorSchema = z.object({
  instanceName: z.string().min(3, "Instance name is required."),
  region: z.string().min(1, "Region is required."),
  machineType: z.string().min(1, "Machine type is required."),
});

const ToolPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<any | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(VmCreatorSchema),
     defaultValues: {
        instanceName: 'dev-instance-01',
        region: 'us-central1',
        machineType: 'e2-medium',
    }
  });

  const handleGeneration = async (data: any) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    if (!user) {
        toast({ title: 'Authentication Required', variant: 'destructive' });
        setIsLoading(false);
        return;
    }
    
    try {
        track('tool_run_started', { toolId: 'vm-creator' });
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        const responseData = {
            success: true,
            instanceName: data.instanceName,
            ipAddress: '34.68.123.145',
            status: 'RUNNING',
        }
        setResult(responseData);
        track('tool_run_succeeded', { toolId: 'vm-creator' });
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
      toast({ title: "Generation Failed", description: e.message, variant: 'destructive' });
      track('tool_run_failed', { toolId: 'vm-creator', error: e.message });
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderResultContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                    <div>
                        <Loader2 className="h-10 w-10 animate-spin text-primary mb-2 mx-auto" />
                        <p>Provisioning VM...</p>
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
        
        if (!result) {
            return (
                 <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                    <p>The provisioned VM details will appear here.</p>
                </div>
            )
        }
        
       return (
            <div className="space-y-4">
                <Alert variant="default" className="border-green-500 bg-green-500/10">
                    <AlertCircle className="h-4 w-4 text-green-500" />
                    <AlertTitle className="text-green-600">VM Provisioned Successfully!</AlertTitle>
                    <AlertDescription>
                        Your new virtual machine is running and ready to use.
                    </AlertDescription>
                </Alert>
                <Card>
                    <CardContent className="pt-6">
                        <p><strong>Instance Name:</strong> {result.instanceName}</p>
                        <p><strong>IP Address:</strong> {result.ipAddress}</p>
                        <p><strong>Status:</strong> <span className="text-green-500 font-semibold">{result.status}</span></p>
                    </CardContent>
                </Card>
            </div>
        );
  };


  return (
    <main className="p-4 md:p-10 space-y-8 container mx-auto">
       <PageHeader
            title="VM Creator"
            description="A utility for developers to provision Google Cloud virtual machines."
            icon={<Server />}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card>
                <form onSubmit={handleSubmit(handleGeneration)}>
                    <CardHeader>
                        <CardTitle>Configuration</CardTitle>
                        <CardDescription>
                            Define the specifications for your new virtual machine.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Controller name="instanceName" control={control} render={({ field }) => (
                            <div className="space-y-2">
                                <Label htmlFor="instanceName">Instance Name</Label>
                                <Input id="instanceName" {...field} />
                                {errors.instanceName && <p className="text-sm text-destructive">{errors.instanceName.message}</p>}
                            </div>
                        )} />
                        <Controller name="region" control={control} render={({ field }) => (
                             <div className="space-y-2">
                                <Label htmlFor="region">Region</Label>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="region"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="us-central1">us-central1 (Iowa)</SelectItem>
                                        <SelectItem value="europe-west1">europe-west1 (Belgium)</SelectItem>
                                        <SelectItem value="asia-east1">asia-east1 (Taiwan)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )} />
                        <Controller name="machineType" control={control} render={({ field }) => (
                            <div className="space-y-2">
                                <Label htmlFor="machineType">Machine Type</Label>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="machineType"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="e2-small">e2-small (2 vCPU, 2 GB memory)</SelectItem>
                                        <SelectItem value="e2-medium">e2-medium (2 vCPU, 4 GB memory)</SelectItem>
                                        <SelectItem value="e2-standard-4">e2-standard-4 (4 vCPU, 16 GB memory)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )} />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" size="lg" disabled={isLoading}>
                        {isLoading ? (
                            <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Provisioning...
                            </>
                        ) : (
                             <>
                            <Sparkles className="mr-2 h-5 w-5" />
                            Provision VM
                            </>
                        )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            
            <Card>
                 <CardHeader>
                    <CardTitle>Result</CardTitle>
                    <CardDescription>The provisioned VM details will appear here.</CardDescription>
                </CardHeader>
                <CardContent className="min-h-[300px]">
                    {renderResultContent()}
                </CardContent>
            </Card>
        </div>
    </main>
  );
}

export default ToolPage;
