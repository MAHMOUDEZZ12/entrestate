
'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { track } from '@/lib/events';
import { notFound, useParams } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { useAuth } from '@/hooks/useAuth';
import { dealAnalyzer, DealAnalyzerInputSchema } from '@/ai/flows/market-intelligence/deal-analyzer';

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
    resolver: zodResolver(DealAnalyzerInputSchema),
    defaultValues: {
      propertyAddress: '123 Ocean View, Dubai Marina',
      purchasePrice: 2000000,
      downPaymentPercentage: 20,
      interestRate: 4.5,
      loanTermYears: 25,
      expectedMonthlyRent: 12000,
      monthlyExpenses: 2500,
      closingCosts: 80000
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
        track('tool_run_started', { toolId: 'deal-analyzer' });
        const responseData = await dealAnalyzer(data);
        setResult(responseData);
        track('tool_run_succeeded', { toolId: 'deal-analyzer' });
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
      toast({ title: "Generation Failed", description: e.message, variant: 'destructive' });
      track('tool_run_failed', { toolId: 'deal-analyzer', error: e.message });
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
                        <p>The AI is analyzing the deal...</p>
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
                    <p>The AI-generated analysis will appear here.</p>
                </div>
            )
        }
        
       return (
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Analysis Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{result.analysisSummary}</p>
                    </CardContent>
                </Card>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader><CardTitle className="text-base">Monthly Cash Flow</CardTitle></CardHeader>
                        <CardContent><p className="text-xl font-bold">AED {result.monthlyCashFlow.toLocaleString()}</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-base">Cash on Cash ROI</CardTitle></CardHeader>
                        <CardContent><p className="text-xl font-bold">{result.cashOnCashROI.toFixed(2)}%</p></CardContent>
                    </Card>
                        <Card>
                        <CardHeader><CardTitle className="text-base">Cap Rate</CardTitle></CardHeader>
                        <CardContent><p className="text-xl font-bold">{result.capitalizationRate.toFixed(2)}%</p></CardContent>
                    </Card>
                        <Card>
                        <CardHeader><CardTitle className="text-base">Monthly Mortgage</CardTitle></CardHeader>
                        <CardContent><p className="text-xl font-bold">AED {result.monthlyMortgagePayment.toLocaleString()}</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-base">Initial Investment</CardTitle></CardHeader>
                        <CardContent><p className="text-xl font-bold">AED {result.totalInitialInvestment.toLocaleString()}</p></CardContent>
                    </Card>
                </div>
            </div>
        );
  };


  return (
    <main className="p-4 md:p-10 space-y-8 container mx-auto">
       <PageHeader
            title="Deal Analyzer"
            description="Analyze the investment potential of any real estate deal."
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
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <Controller name="propertyAddress" control={control} render={({ field }) => (
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="propertyAddress">Property Address</Label>
                                    <Input id="propertyAddress" {...field} />
                                </div>
                            )} />
                            <Controller name="purchasePrice" control={control} render={({ field }) => (
                                <div className="space-y-2">
                                    <Label htmlFor="purchasePrice">Purchase Price (AED)</Label>
                                    <Input id="purchasePrice" type="number" {...field} />
                                </div>
                            )} />
                             <Controller name="downPaymentPercentage" control={control} render={({ field }) => (
                                <div className="space-y-2">
                                    <Label htmlFor="downPaymentPercentage">Down Payment (%)</Label>
                                    <Input id="downPaymentPercentage" type="number" {...field} />
                                </div>
                            )} />
                             <Controller name="interestRate" control={control} render={({ field }) => (
                                <div className="space-y-2">
                                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                                    <Input id="interestRate" type="number" {...field} />
                                </div>
                            )} />
                              <Controller name="loanTermYears" control={control} render={({ field }) => (
                                <div className="space-y-2">
                                    <Label htmlFor="loanTermYears">Loan Term (Years)</Label>
                                    <Input id="loanTermYears" type="number" {...field} />
                                </div>
                            )} />
                             <Controller name="expectedMonthlyRent" control={control} render={({ field }) => (
                                <div className="space-y-2">
                                    <Label htmlFor="expectedMonthlyRent">Monthly Rent (AED)</Label>
                                    <Input id="expectedMonthlyRent" type="number" {...field} />
                                </div>
                            )} />
                             <Controller name="monthlyExpenses" control={control} render={({ field }) => (
                                <div className="space-y-2">
                                    <Label htmlFor="monthlyExpenses">Monthly Expenses (AED)</Label>
                                    <Input id="monthlyExpenses" type="number" {...field} />
                                </div>
                            )} />
                             <Controller name="closingCosts" control={control} render={({ field }) => (
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="closingCosts">Closing Costs (AED)</Label>
                                    <Input id="closingCosts" type="number" {...field} />
                                </div>
                            )} />
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
                            Analyze Deal
                            </>
                        )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            
            <Card>
                 <CardHeader>
                    <CardTitle>Result</CardTitle>
                    <CardDescription>The AI-generated analysis will appear here.</CardDescription>
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

