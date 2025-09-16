
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { LineChart, Users2, Eye, Target, Sparkles, Download, ArrowRight, TrendingUp, FileText } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

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

const topListings = [
    { id: 1, name: 'Emaar Beachfront', views: 4800, leads: 218 },
    { id: 2, name: 'Damac Hills 2', views: 3200, leads: 140 },
    { id: 3, name: 'Sobha Hartland', views: 2500, leads: 95 },
];


export default function MarketPage() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Market Pulse"
        description="Your real-time overview of the real estate market landscape."
        icon={<LineChart className="h-8 w-8" />}
      >
        <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 90 Days</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Overview</Button>
        </div>
      </PageHeader>
      
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
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
                        <CardTitle>Market Intelligence Tools</CardTitle>
                        <CardDescription>Dive deeper into the market data.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Link href="/dashboard/tool/market-reports">
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <FileText className="h-5 w-5 text-primary"/>
                                <div>
                                    <p className="font-semibold text-left">Generate Market Report</p>
                                    <p className="text-xs text-muted-foreground text-left">Create a detailed PDF for any location.</p>
                                </div>
                            </Button>
                        </Link>
                        <Link href="/dashboard/tool/market-trends">
                             <Button variant="outline" className="w-full justify-start gap-3">
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

        <Card>
            <CardHeader>
                <CardTitle>Top Performing Listings</CardTitle>
                <CardDescription>Listings with the most views this period.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Listing Name</TableHead>
                            <TableHead className="text-right">Views</TableHead>
                            <TableHead className="text-right">Leads</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topListings.map((listing) => (
                            <TableRow key={listing.id}>
                                <TableCell className="font-medium">{listing.name}</TableCell>
                                <TableCell className="text-right">{listing.views.toLocaleString()}</TableCell>
                                <TableCell className="text-right">{listing.leads.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </main>
  );
}
