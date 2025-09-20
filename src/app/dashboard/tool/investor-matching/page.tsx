'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, Sparkles, Loader2, Handshake } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
// This is a placeholder for the actual API call to the Genkit flow
// import { runInvestorMatching } from '@/lib/api'; 

interface MatchResult {
  investorName: string;
  matchScore: number;
  reason: string;
}

export default function InvestorMatchingPage() {
  const [file, setFile] = useState<File | null>(null);
  const [propertyDetails, setPropertyDetails] = useState('');
  const [results, setResults] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !propertyDetails) {
      setError('Please upload a client list and provide property details.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults([]);

    // Simulate API call to the Genkit flow
    setTimeout(() => {
        // This is where you would call your actual API:
        // const apiResults = await runInvestorMatching(file, propertyDetails);
        const mockResults: MatchResult[] = [
            { investorName: 'John Doe', matchScore: 92, reason: 'Previously invested in similar high-yield downtown properties.' },
            { investorName: 'Jane Smith', matchScore: 85, reason: 'Budget aligns perfectly and has shown interest in waterfront views.' },
            { investorName: 'Sam Wilson', matchScore: 78, reason: 'Looking for a long-term rental asset, which this property is ideal for.' },
        ];
        setResults(mockResults);
        setIsLoading(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Investor Matching"
        description="Find the best-fit investors for a property from your client list."
        icon={<Handshake className="h-6 w-6" />}
      />
      <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="bg-card/80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Analysis Inputs</CardTitle>
              <CardDescription>Provide the data for the AI to analyze.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="client-list">1. Upload Client List (CSV)</Label>
                  <Input id="client-list" type="file" accept=".csv" onChange={handleFileChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="property-details">2. Property to Match</Label>
                  <Input 
                    id="property-details" 
                    placeholder="e.g., 'Emaar Beachfront, 3-Bed, Waterfront'" 
                    value={propertyDetails}
                    onChange={(e) => setPropertyDetails(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Find Best Matches
                </Button>
              </form>
              {error && <p className="text-destructive text-sm mt-4">{error}</p>}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
           <Card className="bg-card/80 backdrop-blur-lg h-full">
            <CardHeader>
              <CardTitle>Match Results</CardTitle>
              <CardDescription>A ranked list of the best-fit investors from your list, powered by AI.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : results.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Investor</TableHead>
                      <TableHead>Match Score</TableHead>
                      <TableHead>AI-Generated Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-bold">{index + 1}</TableCell>
                        <TableCell>{result.investorName}</TableCell>
                        <TableCell>{result.matchScore}%</TableCell>
                        <TableCell>{result.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center text-muted-foreground h-64 flex items-center justify-center">
                    <p>Your analysis results will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
