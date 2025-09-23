
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Database, ArrowUpDown, ExternalLink, TrendingUp, TrendingDown, Star, Search, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

type DeveloperRecord = {
  developer: string;
  website: string;
  projectsLaunched: number;
  projectsDelivered: number;
  reputation: 'Excellent' | 'Good' | 'Average' | 'Poor';
  avgResaleRoi: number;
  topArea: string;
  topAreaRoi: number;
};

const reputationConfig = {
    'Excellent': { icon: <Star className="h-4 w-4 text-green-500" />, color: 'text-green-500' },
    'Good': { icon: <Star className="h-4 w-4 text-blue-500" />, color: 'text-blue-500' },
    'Average': { icon: <Star className="h-4 w-4 text-yellow-500" />, color: 'text-yellow-500' },
    'Poor': { icon: <Star className="h-4 w-4 text-red-500" />, color: 'text-red-500' },
};

type SortKey = keyof DeveloperRecord;

export default function ArchivePage() {
    const [archiveData, setArchiveData] = useState<DeveloperRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>({ key: 'developer', direction: 'asc' });
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/archive');
                const data = await response.json();
                if (data.ok) {
                    setArchiveData(data.data);
                } else {
                    console.error("Failed to fetch archive data:", data.error);
                }
            } catch (error) {
                console.error("Error fetching archive data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const sortedData = useMemo(() => {
        if (!archiveData) return [];
        let data = [...archiveData];
        if (sortConfig !== null) {
            data.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return data.filter(item => 
            item.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.topArea.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, sortConfig, archiveData]);

    const requestSort = (key: SortKey) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const SortableButton = ({ columnKey, label }: { columnKey: SortKey; label: string }) => (
        <Button variant="ghost" onClick={() => requestSort(columnKey)}>
            {label}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    );

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Developer Archive (2005-Present)"
                description="A historical database of developer performance, projects, and market reputation, serving as the source of truth for our AI."
                icon={<Database className="h-8 w-8" />}
            >
                <Link href="/gem">
                    <Button variant="outline">Back to Gem Dashboard</Button>
                </Link>
            </PageHeader>

            <Card>
                <CardHeader>
                    <CardTitle>Market Intelligence Database</CardTitle>
                    <CardDescription>
                        This archive is the foundational data layer that powers our AI's market analysis and predictions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center py-4">
                        <div className="relative w-full max-w-sm">
                           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input
                                placeholder="Filter by developer or area..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead><SortableButton columnKey="developer" label="Developer" /></TableHead>
                                    <TableHead>Website</TableHead>
                                    <TableHead><SortableButton columnKey="projectsLaunched" label="Launched" /></TableHead>
                                    <TableHead><SortableButton columnKey="projectsDelivered" label="Delivered" /></TableHead>
                                    <TableHead><SortableButton columnKey="reputation" label="Reputation" /></TableHead>
                                    <TableHead><SortableButton columnKey="avgResaleRoi" label="Avg. ROI" /></TableHead>
                                    <TableHead><SortableButton columnKey="topArea" label="Top Area" /></TableHead>
                                    <TableHead><SortableButton columnKey="topAreaRoi" label="Area ROI" /></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-24 text-center">
                                            <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                                            <p className="text-muted-foreground">Loading source of truth...</p>
                                        </TableCell>
                                    </TableRow>
                                ) : sortedData.map((item) => (
                                    <TableRow key={item.developer}>
                                        <TableCell className="font-medium">{item.developer}</TableCell>
                                        <TableCell>
                                            <a href={`https://${item.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                                                {item.website} <ExternalLink className="h-3 w-3"/>
                                            </a>
                                        </TableCell>
                                        <TableCell>{item.projectsLaunched}</TableCell>
                                        <TableCell>{item.projectsDelivered}</TableCell>
                                        <TableCell>
                                            <div className={`flex items-center gap-1 font-semibold ${reputationConfig[item.reputation].color}`}>
                                                {reputationConfig[item.reputation].icon}
                                                {item.reputation}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                             <Badge variant={item.avgResaleRoi > 8 ? 'default' : 'secondary'}>{item.avgResaleRoi.toFixed(1)}%</Badge>
                                        </TableCell>
                                        <TableCell>{item.topArea}</TableCell>
                                        <TableCell>
                                             <Badge variant={item.topAreaRoi > 10 ? 'default' : 'secondary'}>{item.topAreaRoi.toFixed(1)}%</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
