
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Loader2, FileCheck, Download } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { useToast } from '@/hooks/use-toast';
import { generatePaymentPlan } from '@/ai/flows/listing-crm/generate-payment-plan';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function PaymentPlannerPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const [projectId, setProjectId] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [planType, setPlanType] = useState('Standard');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !totalPrice) {
      toast({ title: "All fields are required", variant: "destructive" });
      return;
    }
    const price = parseFloat(totalPrice);
    if (isNaN(price) || price <= 0) {
      toast({ title: 'Invalid Price', description: 'Please enter a valid total price.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
        const response = await generatePaymentPlan({ projectId, totalPrice: price, planType });
        setResult(response);
        toast({ title: 'Payment Plan Generated!', description: 'Your new client-friendly plan is ready.' });
    } catch (e: any) {
        toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Payment Planner"
        description="Generate clear, client-friendly payment plans for off-plan properties."
        icon={<FileCheck className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-1 sticky top-24">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Plan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectId">Project</Label>
                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger><SelectValue placeholder="Select a project" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emaar-beachfront">Emaar Beachfront</SelectItem>
                    <SelectItem value="damac-hills-2">Damac Hills 2</SelectItem>
                    <SelectItem value="sobha-hartland">Sobha Hartland</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalPrice">Total Price (AED)</Label>
                <Input id="totalPrice" type="number" value={totalPrice} onChange={e => setTotalPrice(e.target.value)} placeholder="e.g., 2500000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="planType">Plan Structure</Label>
                <Select value={planType} onValueChange={setPlanType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard (e.g., 20/80)</SelectItem>
                    <SelectItem value="Post-Handover">Post-Handover (e.g., 50/50)</SelectItem>
                    <SelectItem value="Construction-Linked">Construction-Linked</SelectItem>
                    <SelectItem value="Flexible (AI Suggestion)">Flexible (AI Suggestion)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {isLoading ? 'Generating...' : 'Generate Plan'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Generated Payment Plan</CardTitle>
                <CardDescription>The AI-generated schedule will appear here, ready to be sent to your client.</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px]">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : result ? (
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">{result.planName}</h3>
                        <p className="text-sm text-muted-foreground">{result.planDescription}</p>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Milestone</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Amount (AED)</TableHead>
                                    <TableHead className="text-right">Percentage</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {result.milestones.map((item: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.milestone}</TableCell>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell className="text-right">{item.amount.toLocaleString()}</TableCell>
                                        <TableCell className="text-right">{item.percentage}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         <Button variant="outline" className="w-full mt-4">
                            <Download className="mr-2 h-4 w-4" /> Export as PDF
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                         <FileCheck className="h-12 w-12 mx-auto mb-2" />
                        <p>Your payment plan will be displayed here.</p>
                    </div>
                )}
              </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
