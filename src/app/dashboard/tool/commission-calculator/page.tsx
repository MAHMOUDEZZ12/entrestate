
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Loader2, Calculator } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { useToast } from '@/hooks/use-toast';

export default function CommissionCalculatorPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const [salePrice, setSalePrice] = useState('');
  const [commissionRate, setCommissionRate] = useState('2');
  const [agentSplit, setAgentSplit] = useState('50');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(salePrice);
    const rate = parseFloat(commissionRate);
    const split = parseFloat(agentSplit);

    if (isNaN(price) || isNaN(rate) || isNaN(split)) {
        toast({ title: 'Invalid Input', description: 'Please enter valid numbers for all fields.', variant: 'destructive'});
        return;
    }
    
    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
        const totalCommission = price * (rate / 100);
        const yourShare = totalCommission * (split / 100);
        const brokerageShare = totalCommission - yourShare;
        setResult({ totalCommission, yourShare, brokerageShare });
        setIsLoading(false);
    }, 500);
  };

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Commission Calculator"
        description="Instantly calculate your sales commission based on sale price, commission rate, and your split."
        icon={<Calculator className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Deal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="salePrice">Sale Price (AED)</Label>
                <Input id="salePrice" type="number" value={salePrice} onChange={e => setSalePrice(e.target.value)} placeholder="e.g., 2500000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commissionRate">Total Commission Rate (%)</Label>
                <Input id="commissionRate" type="number" value={commissionRate} onChange={e => setCommissionRate(e.target.value)} placeholder="e.g., 2" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agentSplit">Your Split with Brokerage (%)</Label>
                <Input id="agentSplit" type="number" value={agentSplit} onChange={e => setAgentSplit(e.target.value)} placeholder="e.g., 50" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Calculator className="mr-2 h-4 w-4" />}
                {isLoading ? 'Calculating...' : 'Calculate Commission'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commission Breakdown</CardTitle>
            <CardDescription>Your calculated earnings from the deal.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px] flex items-center justify-center bg-muted/50 rounded-lg">
            {isLoading ? (
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            ) : result ? (
                 <div className="space-y-4 w-full">
                     <div className="flex justify-between items-baseline p-3 bg-background rounded-md">
                        <span className="text-muted-foreground">Total Commission</span>
                        <span className="font-bold text-lg">AED {result.totalCommission.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                     <div className="flex justify-between items-baseline p-3 bg-background rounded-md">
                        <span className="text-muted-foreground">Brokerage Share</span>
                        <span className="font-bold text-lg">AED {result.brokerageShare.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between items-baseline p-3 bg-primary/10 rounded-md border border-primary/20">
                        <span className="font-semibold text-primary">Your Take-Home</span>
                        <span className="font-bold text-2xl text-primary">AED {result.yourShare.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                 </div>
            ) : (
                <div className="text-center text-muted-foreground">
                    <Calculator className="h-12 w-12 mx-auto mb-2" />
                    <p>Your breakdown will appear here.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
