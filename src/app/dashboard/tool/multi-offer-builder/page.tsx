
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, Loader2, Container, Upload } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { useToast } from '@/hooks/use-toast';

export default function MultiOfferBuilderPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  
  const [properties, setProperties] = useState('');
  const [clientInfo, setClientInfo] = useState('');
  const [terms, setTerms] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!properties || !clientInfo || !terms) {
      toast({ title: "All fields are required", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
        setResult('data:application/pdf;base64,'); // Placeholder for a real PDF data URI
        setIsLoading(false);
        toast({ title: 'Comparison Ready!', description: 'Your multi-offer package has been generated.' });
    }, 2500);
  };

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Multi-Offer Builder"
        description="Create a professional, side-by-side comparison of multiple properties for your client."
        icon={<Container className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Comparison Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="properties">Properties to Compare</Label>
                <Textarea id="properties" value={properties} onChange={e => setProperties(e.target.value)} placeholder="Enter one property address per line..." required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientInfo">Client Information</Label>
                <Textarea id="clientInfo" value={clientInfo} onChange={e => setClientInfo(e.target.value)} placeholder="e.g., John Doe, budget: $2.5M, looking for high ROI" required />
              </div>
               <div className="space-y-2">
                <Label htmlFor="terms">Key Terms for Comparison</Label>
                <Textarea id="terms" value={terms} onChange={e => setTerms(e.target.value)} placeholder="e.g., Price, Sq. Ft, ROI, Handover Date" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {isLoading ? 'Building...' : 'Build Comparison PDF'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Document</CardTitle>
            <CardDescription>Your comparison PDF will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
            {isLoading ? (
                <div className="text-center text-muted-foreground">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mb-2 mx-auto" />
                    <p>Generating your document...</p>
                </div>
            ) : result ? (
                <iframe src={result} className="w-full h-96 rounded-md border" title="Generated PDF Preview" />
            ) : (
                <div className="text-center text-muted-foreground">
                    <Container className="h-12 w-12 mx-auto mb-2" />
                    <p>Your comparison document will be displayed here.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
