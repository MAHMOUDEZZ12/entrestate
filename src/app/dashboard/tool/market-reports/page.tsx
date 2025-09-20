'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Loader2, Newspaper, LineChart, TrendingUp, CheckCircle, BarChart3, Bot } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';

interface ReportOutput {
  title: string;
  executiveSummary: string;
  keyMarketTrends: string[];
  pricingAnalysis: string;
  futureOutlook: string;
  recommendation: string;
}

export default function MarketReportsPage() {
  const [location, setLocation] = useState('');
  const [audience, setAudience] = useState('Investor');
  const [report, setReport] = useState<ReportOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
      setError('Please provide a location for the report.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setReport(null);

    // Simulate API call to the Genkit flow
    setTimeout(() => {
        const mockReport: ReportOutput = {
            title: `Comprehensive Market Analysis: ${location} - ${audience} Report`,
            executiveSummary: `The ${location} market is currently experiencing a period of robust growth, driven by strong international demand and a favorable economic outlook. This report provides a detailed analysis tailored for a(n) ${audience}.`,
            keyMarketTrends: [
                'Increased demand for waterfront properties, driving a 12% price increase YoY.',
                'Surge in short-term rental registrations, indicating high rental yield potential.',
                'New government infrastructure projects are expected to boost long-term value.'
            ],
            pricingAnalysis: 'The average price per square foot currently stands at AED 2,500, up 5% quarter-over-quarter. Properties with sea views command a 15-20% premium. Rental yields are averaging between 6-8%.',
            futureOutlook: 'Our AI model forecasts a continued positive trajectory for the next 12-18 months, with a projected 7-10% increase in capital appreciation, assuming stable economic conditions.',
            recommendation: `For a(n) ${audience}, we recommend focusing on 2-bedroom apartments with full sea views to maximize both rental yield and long-term capital appreciation. The current market conditions are favorable for entry.`
        };
        setReport(mockReport);
        setIsLoading(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Market Reports"
        description="Generate in-depth, narrative-driven market analysis reports."
        icon={<Newspaper className="h-6 w-6" />}
      />
      <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
          <Card className="bg-card/80 backdrop-blur-lg sticky top-24">
            <CardHeader>
              <CardTitle>Report Inputs</CardTitle>
              <CardDescription>Define the scope of your analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="e.g., 'Dubai Marina'" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audience">Audience</Label>
                  <Select value={audience} onValueChange={setAudience}>
                    <SelectTrigger id="audience">
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Investor">Investor</SelectItem>
                      <SelectItem value="Buyer">Home Buyer</SelectItem>
                      <SelectItem value="Seller">Seller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Generate Report
                </Button>
              </form>
              {error && <p className="text-destructive text-sm mt-4">{error}</p>}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
           <Card className="bg-card/80 backdrop-blur-lg min-h-[calc(100vh-300px)]">
            <CardHeader>
              <CardTitle>Generated AI Market Report</CardTitle>
              <CardDescription>A comprehensive, data-driven analysis powered by your AI Co-pilot.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              ) : report ? (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h2>{report.title}</h2>
                    
                    <h4>Executive Summary</h4>
                    <p>{report.executiveSummary}</p>
                    
                    <h4><TrendingUp className="inline-block h-5 w-5 mr-2" />Key Market Trends</h4>
                    <ul>
                        {report.keyMarketTrends.map((trend, i) => <li key={i}>{trend}</li>)}
                    </ul>

                    <h4><BarChart3 className="inline-block h-5 w-5 mr-2" />Pricing Analysis</h4>
                    <p>{report.pricingAnalysis}</p>

                    <h4><LineChart className="inline-block h-5 w-5 mr-2" />Future Outlook</h4>
                    <p>{report.futureOutlook}</p>
                    
                    <h4><CheckCircle className="inline-block h-5 w-5 mr-2" />AI Recommendation for a(n) {audience}</h4>
                    <p className="font-semibold">{report.recommendation}</p>
                </div>
              ) : (
                <div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center">
                    <Bot className="h-12 w-12 mb-4" />
                    <p>Your generated report will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
