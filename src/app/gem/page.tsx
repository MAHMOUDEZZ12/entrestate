'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { GanttChartSquare, Database, Upload, Key, GitMerge, HeartPulse } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const devTools = [
    {
        title: "System Health & Status",
        description: "Monitor the operational status of all services, AI models, and external APIs.",
        href: "/gem/system-health",
        icon: <HeartPulse className="h-8 w-8" />
    },
    {
        title: "Developer Archive (Source of Truth)",
        description: "View the historical database of developer performance and project data that trains our AI.",
        href: "/gem/archive",
        icon: <Database className="h-8 w-8" />
    },
     {
        title: "Sitemap & Structure",
        description: "A complete overview of all pages and routes within the application for planning.",
        href: "/gem/sitemap",
        icon: <GitMerge className="h-8 w-8" />
    },
    {
        title: "Data Importer",
        description: "Manage search context by importing and exporting structured XML data.",
        href: "/gem/data-importer",
        icon: <Upload className="h-8 w-8" />
    },
    {
        title: "API Keys & Connections",
        description: "View the status and configuration of all external API keys and connections.",
        href: "/gem/keys",
        icon: <Key className="h-8 w-8" />
    },
];

export default function GemDashboardPage() {
    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Gem Dashboard"
                description="The central command center for developers and administrators to monitor, manage, and build upon the Entrestate ecosystem."
                icon={<GanttChartSquare className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {devTools.map(tool => (
                    <Link href={tool.href} key={tool.title}>
                        <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all hover:-translate-y-1 bg-card/50 backdrop-blur-lg">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                                    {tool.icon}
                                </div>
                                <div>
                                    <CardTitle>{tool.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{tool.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </main>
    );
}
