
'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Facebook, Sparkles, LayoutTemplate, Users2, Instagram, Video, BotMessageSquare, Album } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { tools } from '@/lib/tools-data';

const metaTools = [
    'meta-auto-pilot',
    'campaign-builder',
    'audience-creator',
    'insta-ads-designer',
    'reel-ads',
    'instagram-admin-ai',
    'story-planner'
];

export default function MetaDashboardPage() {

    const filteredTools = tools.filter(tool => metaTools.includes(tool.id));

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Meta Ads Dashboard"
                description="Your command center for all Facebook & Instagram advertising tools. Launch campaigns, create audiences, and design ads from one place."
                icon={<Facebook className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTools.map(tool => (
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
