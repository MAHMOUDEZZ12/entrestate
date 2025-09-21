
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, Loader2, FileText, Upload, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle } from '@/components/ui/alert';

export default function LeaseReviewerPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({ title: "No file selected", description: "Please upload a lease agreement to review.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setResult(null);

    // Simulate API call to a Genkit flow
    setTimeout(() => {
        const mockResult = {
            summary: "This is a standard residential lease agreement for a 12-month term. Key terms are within normal market parameters.",
            issues: [
                { severity: 'Medium', clause: 'Clause 8.2 (Maintenance)', description: "The tenant's responsibility for 'all minor repairs' is ambiguous. Recommend clarifying this with a specific monetary threshold (e.g., 'repairs under $100')." },
                { severity: 'Low', clause: 'Clause 15.1 (Early Termination)', description: 'The early termination penalty of two months\' rent is standard, but could be negotiable.' },
            ]
        };
        setResult(mockResult);
        setIsLoading(false);
        toast({ title: 'Review Complete', description: 'The AI has finished analyzing the lease agreement.' });
    }, 2500);
  };

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="AI Lease Reviewer"
        description="Upload a lease agreement (PDF/DOCX) and the AI will analyze it for potential issues, ambiguous language, and non-standard clauses."
        icon={<FileText className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Upload Lease Agreement</CardTitle>
            </CardHeader>
            <CardContent>
              <Input 
                id="lease-file" 
                type="file" 
                accept=".pdf,.docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading || !file} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {isLoading ? 'Analyzing...' : 'Review Document'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analysis Report</CardTitle>
            <CardDescription>Potential issues and recommendations from the AI.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px]">
            {isLoading ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : result ? (
                <div className="space-y-4">
                    <Alert>
                        <AlertTitle className="font-semibold">Summary</AlertTitle>
                        <p className="text-sm">{result.summary}</p>
                    </Alert>
                    <h4 className="font-semibold pt-2">Potential Issues:</h4>
                    <div className="space-y-3">
                         {result.issues.map((issue: any, index: number) => (
                             <Alert key={index} variant={issue.severity === 'Medium' ? 'destructive' : 'default'}>
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>{issue.severity} Risk: {issue.clause}</AlertTitle>
                                <p className="text-sm">{issue.description}</p>
                            </Alert>
                         ))}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                    <p>Your lease analysis will appear here.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
