
'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Building, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { tools } from '@/lib/tools-data';
import * as LucideIcons from 'lucide-react';

const suiteTools = tools.filter(tool => tool.suite === 'AI Listing Portal');

export default function ListingPortalDashboardPage() {
    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="AI Listing Portal Dashboard"
                description="A complete suite of tools for managing, syndicating, and analyzing your property listings."
                icon={<Building className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {suiteTools.map(tool => (
                    <Link href={`/me/tool/${tool.id}`} key={tool.id}>
                        <Card className="h-full hover:border-primary/50 transition-colors hover:shadow-lg hover:-translate-y-1">
                            <CardHeader>
                                <div className="p-3 rounded-lg text-white w-fit mb-3" style={{ backgroundColor: tool.color }}>
                                    {React.createElement((LucideIcons as any)[tool.iconName] || Sparkles, { className: 'h-6 w-6' })}
                                </div>
                                <CardTitle>{tool.title}</CardTitle>
                                <CardDescription>{tool.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </main>
    );
}
