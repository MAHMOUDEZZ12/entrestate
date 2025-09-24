'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { GitMerge, Globe, LayoutDashboard, Users, BookOpen, GanttChartSquare, FileText, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const structure = {
    public: [
        { name: 'Home', path: '/' },
        { name: 'Apps (Legacy)', path: '/apps' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Solutions', path: '/solutions' },
        { name: 'Market', path: '/market' },
        { name: 'Blog', path: '/blog' },
        { name: 'Technology', path: '/technology' },
        { name: 'About', path: '/about' },
        { name: 'Login', path: '/login' },
        { name: 'Support', path: '/support' },
        { name: 'Status', path: '/status' },
        { name: 'SuperFreeTime', path: '/superfreetime' },
    ],
    dashboard: [
        { name: 'Home', path: '/me' },
        { name: 'Marketplace', path: '/me/marketing' },
        { name: 'Flow Builder', path: '/me/flows' },
        { name: 'Brand & Assets', path: '/me/brand' },
        { name: 'AI Assistant', path: '/me/assistant' },
        { name: 'Market Library', path: '/me/tool/projects-finder' },
        { name: 'Leads (CRM)', path: '/me/leads' },
        { name: 'Settings', path: '/me/settings' },
        { name: 'Client Pages', path: '/me/clients'},
        { name: 'Contacts Directory', path: '/me/directory'},
        { name: 'Solutions Hub', path: '/me/solutions'},
    ],
    community: [
        { name: 'Community Notes', path: '/me/community' },
        { name: 'Academy', path: '/me/community/academy' },
        { name: 'Roadmap', path: '/me/community/roadmap' },
        { name: 'Documentation', path: '/me/community/documentation' },
    ],
    resources: [
        { name: 'Flow Library', path: '/resources/flows' },
    ],
    legal: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
    ],
    gem: [
        { name: 'Gem Dashboard', path: '/gem' },
        { name: 'System Health', path: '/gem/system-health' },
        { name: 'Sitemap', path: '/gem/sitemap'},
    ],
    cloud: [
        { name: 'Developer Archive', path: '/gem/archive' },
        { name: 'Data Importer', path: '/gem/data-importer' },
        { name: 'API Keys & Status', path: '/gem/keys' },
    ]
};

const SectionCard = ({ title, icon, pages }: { title: string, icon: React.ReactNode, pages: {name: string, path: string}[] }) => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-3">
                {icon}
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {pages.map(page => (
                    <Link href={page.path} key={page.path}>
                        <div className="p-3 border rounded-lg hover:bg-muted hover:border-primary/50 transition-colors text-center">
                            <p className="font-semibold text-sm">{page.name}</p>
                            <p className="text-xs text-muted-foreground font-mono">{page.path}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </CardContent>
    </Card>
);

export default function SitemapPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Sitemap & Structure"
        description="A complete overview of all pages and routes within the application for planning."
        icon={<GitMerge className="h-8 w-8" />}
      >
        <Link href="/gem">
            <Button variant="outline">Back to Gem Dashboard</Button>
        </Link>
      </PageHeader>
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-8">
        <SectionCard title="Public Site" icon={<Globe />} pages={structure.public} />
        <SectionCard title="Dashboard (/me)" icon={<LayoutDashboard />} pages={structure.dashboard} />
        <SectionCard title="Community Hub" icon={<Users />} pages={structure.community} />
        <SectionCard title="Resources" icon={<BookOpen />} pages={structure.resources} />
        <SectionCard title="Gem (Admin)" icon={<GanttChartSquare />} pages={structure.gem} />
        <SectionCard title="Cloud Data Pages" icon={<Cloud />} pages={structure.cloud} />
        <SectionCard title="Legal" icon={<FileText />} pages={structure.legal} />
      </main>
    </div>
  );
}
