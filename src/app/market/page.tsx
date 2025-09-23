
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { LineChart, Users2, Eye, Target, Sparkles, Download, ArrowRight, TrendingUp, FileText, Building, Database, BarChart, FileJson, BrainCircuit, Server } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import Link from 'next/link';
import { ShinyButton } from '@/components/ui/shiny-button';

const kpiData = {
  averagePrice: 2450000,
  transactions: 1280,
  activeListings: 4500,
  marketSentiment: 'Cautiously Optimistic',
};

const chartData = [
  { name: 'Jan', value: 2.1 },
  { name: 'Feb', value: 2.3 },
  { name: 'Mar', value: 2.2 },
  { name: 'Apr', value: 2.5 },
  { name: 'May', value: 2.4 },
  { name: 'Jun', value: 2.6 },
  { name: 'Jul', value: 2.8 },
];

const dataProducts = [
    {
        title: "Live Market API",
        icon: <Server className="h-8 w-8" />,
        description: "Direct API access to our real-time, verified market data, including listings, trends, and developer information."
    },
    {
        title: "Trained Models API",
        icon: <BrainCircuit className="h-8 w-8" />,
        description: "Leverage our AI models trained on your private data. Upload documents and get a secure API endpoint for your custom assistant."
    },
    {
        title: "Smart Segments API",
        icon: <BarChart className="h-8 w-8" />,
        description: "Access our proprietary, AI-generated market segments like 'High-Yield Rental Hotspots' to power your own applications."
    },
    {
        title: "Bulk Data Feeds",
        icon: <FileJson className="h-8 w-8" />,
        description: "Access our comprehensive historical datasets for deep analysis, model training, or proprietary research. Data since 2005 available."
    }
];

export default function MarketPage() {

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 w-full">
      <PageHeader
        title="Market Data Intelligence Cloud"
        description="Your gateway to the industry's most comprehensive and actionable real estate intelligence. Access our unique Smart Segments and Trained Models via API."
        icon={<LineChart className="h-8 w-8" />}
      >
        <Link href="/login">
            <Button variant="outline"><ArrowRight className="mr-2 h-4 w-4" /> Go to Dashboard</Button>
        </Link>
      </PageHeader>
      
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Price (AED)</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{(kpiData.averagePrice / 1000000).toFixed(2)}M</div>
                        <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                        <Users2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.transactions.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+15% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.activeListings.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">-5% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Market Sentiment</CardTitle>
                        <Sparkles className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpiData.marketSentiment}</div>
                        <p className="text-xs text-muted-foreground">Based on news & social analysis</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Price Index Trend (AED M)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 0.2', 'dataMax + 0.2']} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                                <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#colorUv)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Explore The Data</CardTitle>
                            <CardDescription>Use our interactive tools to dive deeper into the market data yourself.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Link href="/me/tool/market-reports">
                                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                                    <FileText className="h-5 w-5 text-primary"/>
                                    <div>
                                        <p className="font-semibold text-left">Generate Market Report</p>
                                        <p className="text-xs text-muted-foreground text-left">Create a detailed PDF for any location.</p>
                                    </div>
                                </Button>
                            </Link>
                            <Link href="/me/tool/market-trends">
                                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                                    <TrendingUp className="h-5 w-5 text-primary"/>
                                    <div>
                                        <p className="font-semibold text-left">Analyze Market Trends</p>
                                        <p className="text-xs text-muted-foreground text-left">Synthesize news to find emerging trends.</p>
                                    </div>
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>

        <section className="py-24 bg-muted/50">
           <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading">Our Data Products</h2>
                    <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                      Power your business with direct API access to our verified, AI-enriched market intelligence.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {dataProducts.map((product) => (
                         <Card key={product.title} className="text-center bg-card">
                            <CardHeader>
                                <div className="p-4 bg-primary/10 text-primary rounded-full w-fit mx-auto mb-4">
                                    {product.icon}
                                </div>
                                <CardTitle>{product.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">{product.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                 <div className="mt-12 text-center">
                  <Link href="/login">
                      <ShinyButton>
                          Contact Sales for API Access
                          <ArrowRight className="ml-2" />
                      </ShinyButton>
                  </Link>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}
