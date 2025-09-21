
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { LineChart, Users2, Eye, Target, Sparkles, Download, ArrowRight, TrendingUp, FileText, Building, BarChart } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { ResourcesHeader } from '@/components/resources-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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

const projectPipeline = {
    latestLaunches: [
        { name: 'Azure Residences', developer: 'Emaar', location: 'Dubai Marina', status: 'New Launch' },
        { name: 'Verde by Sobha', developer: 'Sobha Realty', location: 'JLT', status: 'New Launch' },
        { name: 'Eterno at Damac Hills 2', developer: 'Damac', location: 'Damac Hills 2', status: 'New Launch' },
    ],
    upcomingSoon: [
        { name: 'Project Oasis', developer: 'Emaar', location: 'To be announced', status: 'Upcoming' },
        { name: 'The Altitude Tower', developer: 'Meraas', location: 'Business Bay', status: 'Upcoming' },
        { name: 'Nakheel Palm Gateway', developer: 'Nakheel', location: 'Palm Jumeirah', status: 'Upcoming' },
    ],
    deliveringSoon: [
        { name: 'Address The Bay', developer: 'Emaar', location: 'Emaar Beachfront', status: 'Handover Q4 2024' },
        { name: 'Sobha Hartland II - Villas', developer: 'Sobha Realty', location: 'Sobha Hartland', status: 'Handover Q1 2025' },
        { name: 'Binghatti Phantom', developer: 'Binghatti', location: 'JVC', status: 'Handover Q4 2024' },
    ]
};

const ProjectPipelineCard = ({ project }: { project: { name: string, developer: string, location: string, status: string } }) => (
    <Card className="flex flex-col">
        <CardHeader>
            <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <Building className="h-6 w-6" />
                </div>
                <div>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.developer} - {project.location}</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="mt-auto">
            <Badge variant={project.status === 'Upcoming' ? 'secondary' : 'default'}>{project.status}</Badge>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-auto float-right">View Details</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>{project.name}</DialogTitle>
                        <DialogDescription>{project.developer} - {project.location}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Carousel>
                            <CarouselContent>
                                {Array.from({ length: 3 }).map((_, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-video items-center justify-center p-6 relative">
                                             <Image src={`https://picsum.photos/seed/${project.name.replace(/\s/g, '-')}-${index}/600/400`} alt={`${project.name} image ${index+1}`} layout="fill" objectFit="cover" className="rounded-lg" data-ai-hint="building apartment" />
                                        </CardContent>
                                    </Card>
                                    </div>
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                        <div className="text-sm">
                            <p className="font-semibold">Price Range:</p>
                            <p>AED 1.5M - AED 5M</p>
                            <p className="font-semibold mt-2">Unit Types:</p>
                            <p>1-3 Bedroom Apartments, 4-Bedroom Penthouses</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </CardContent>
    </Card>
);

export default function ResourcesPage() {

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ResourcesHeader />
      <main className="flex-1 w-full">

        <section className="w-full py-16 md:py-24">
            <div className="container max-w-7xl mx-auto px-4 md:px-6">
                <PageHeader
                    icon={<BarChart className="h-8 w-8" />}
                    title="Market Pulse: Dubai"
                    description="A real-time overview of the Dubai real estate market landscape, powered by AI."
                >
                <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Overview</Button>
                </PageHeader>
            </div>
        </section>
      
        <section className="w-full pb-16 md:pb-24">
            <div className="container max-w-7xl mx-auto px-4 md:px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
        </section>

        <section className="w-full pb-16 md:pb-24">
            <div className="container max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
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
                            <CardTitle>AI-Powered Intelligence Tools</CardTitle>
                            <CardDescription>Dive deeper into the market data.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Link href="/dashboard/tool/market-reports">
                                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                                    <FileText className="h-5 w-5 text-primary"/>
                                    <div>
                                        <p className="font-semibold text-left">Generate Market Report</p>
                                        <p className="text-xs text-muted-foreground text-left">Create a detailed PDF for any location.</p>
                                    </div>
                                </Button>
                            </Link>
                            <Link href="/dashboard/tool/market-trends">
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
        </section>

        <section className="w-full py-16 md:py-24 bg-muted/50">
            <div className="container max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tighter">Project Pipeline</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">A snapshot of the latest off-plan and new launch project developments across the market.</p>
                </div>
                 <Tabs defaultValue="latest-launches">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="latest-launches">Latest Launches</TabsTrigger>
                        <TabsTrigger value="upcoming-soon">Upcoming Soon</TabsTrigger>
                        <TabsTrigger value="delivering-soon">Delivering Soon</TabsTrigger>
                    </TabsList>
                    <TabsContent value="latest-launches">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projectPipeline.latestLaunches.map((p, i) => (
                                <ProjectPipelineCard key={i} project={p} />
                            ))}
                        </div>
                    </TabsContent>
                     <TabsContent value="upcoming-soon">
                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projectPipeline.upcomingSoon.map((p, i) => (
                                <ProjectPipelineCard key={i} project={p} />
                            ))}
                        </div>
                    </TabsContent>
                     <TabsContent value="delivering-soon">
                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projectPipeline.deliveringSoon.map((p, i) => (
                               <ProjectPipelineCard key={i} project={p} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>

      </main>
    </div>
  );
}
