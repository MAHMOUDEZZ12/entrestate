
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, Palette, Pen, Upload, Download, MonitorPlay, LayoutTemplate, LineChart, Target, FileText, Separator, Lightbulb, MapPin, Search, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { generateMarketReport } from '@/ai/flows/market-intelligence/generate-market-report';
import type { GenerateMarketReportInput, GenerateMarketReportOutput } from '@/ai/flows/market-intelligence/generate-market-report';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { track } from '@/lib/events';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ResultDisplay = ({ result, topic }: { result: GenerateMarketReportOutput, topic: string }) => {
    return (
      <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-heading">{result.reportTitle}</CardTitle>
                 <CardDescription>Generated for: {topic}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 prose prose-sm dark:prose-invert max-w-none">
                 <div>
                    <h4 className="font-semibold text-lg mb-2">Executive Summary</h4>
                    <p className="text-foreground/80">{result.executiveSummary}</p>
                </div>

                <div>
                    <h4 className="font-semibold text-lg mb-2">Key Market Trends</h4>
                    <ul className="space-y-3">
                        {result.marketTrends.map((item, index) => (
                        <li key={index}>
                            <p className="font-semibold">{item.trend}</p>
                            <p className="text-sm text-muted-foreground">{item.analysis}</p>
                        </li>
                        ))}
                    </ul>
                </div>
                
                 <div>
                    <h4 className="font-semibold text-lg mb-2">Pricing Analysis</h4>
                    <p className="text-foreground/80">{result.pricingAnalysis}</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-lg mb-2">Future Outlook</h4>
                    <p className="text-foreground/80">{result.futureOutlook}</p>
                </div>
            </CardContent>
        </Card>
      </div>
    );
};


export default function MarketReportsPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GenerateMarketReportOutput | null>(null);
    
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [reportType, setReportType] = useState('Investor');


    const handleGeneration = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!location || !propertyType) {
            toast({ title: 'Missing Information', description: 'Please provide both a location and property type.', variant: 'destructive' });
            return;
        }

        setIsLoading(true);
        setResult(null);
        track('market_report_generation_started', { location, propertyType, reportType });

        try {
            const payload: GenerateMarketReportInput = { location, propertyType, reportType: reportType as any };
            const responseData = await generateMarketReport(payload);
            setResult(responseData);
            track('market_report_generation_succeeded');
            toast({ title: 'Market Report Complete!', description: 'Your new report is ready for review.'});
        } catch (e: any) {
            console.error(e);
            toast({
                title: "Generation Failed",
                description: e.message,
                variant: 'destructive',
            });
            track('market_report_generation_failed', { error: e.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Market Reports"
                description="Generate in-depth, narrative-driven market analysis reports for any location."
                icon={<TrendingUp className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                    <Card>
                        <CardHeader>
                            <CardTitle>Report Parameters</CardTitle>
                            <CardDescription>Define the focus of your report.</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleGeneration}>
                            <CardContent className="space-y-4">
                                 <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g., 'Dubai Marina'" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="propertyType">Property Type</Label>
                                    <Input id="propertyType" value={propertyType} onChange={e => setPropertyType(e.target.value)} placeholder="e.g., 'Luxury 2-BR Apartments'" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reportType">Target Audience</Label>
                                    <Select value={reportType} onValueChange={setReportType}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Investor">Investor</SelectItem>
                                            <SelectItem value="Home Buyer">Home Buyer</SelectItem>
                                            <SelectItem value="Seller">Seller</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Analyzing...</> : <><Wand2 className="mr-2 h-5 w-5" />Generate Report</>}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    {isLoading ? (
                        <Card className="flex items-center justify-center h-96">
                            <div className="text-center text-muted-foreground">
                                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
                                <p className="font-semibold">Your AI Co-Pilot is writing the report...</p>
                                <p className="text-sm">This may take a moment.</p>
                            </div>
                        </Card>
                    ) : result ? (
                        <ResultDisplay result={result} topic={`${location} - ${propertyType}`} />
                    ) : (
                        <Card className="flex flex-col items-center justify-center h-96 border-dashed text-center p-6">
                            <FileText className="h-16 w-16 mx-auto mb-4 opacity-10" />
                            <h3 className="text-lg font-semibold text-foreground">Your Market Report Will Appear Here</h3>
                            <p className="text-muted-foreground">Enter your parameters and let the AI generate a comprehensive analysis.</p>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
