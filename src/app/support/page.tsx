
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { LifeBuoy, ArrowRight, BookOpen, MessageSquare, Search, FileText, Bot, Bug, FileWarning, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { tools } from '@/lib/tools-client';

const supportTopics = [
    {
        title: "Getting Started",
        description: "Your guide to setting up your workspace, connecting accounts, and launching your first campaign.",
        icon: <BookOpen className="h-6 w-6 text-primary" />,
        href: "/documentation"
    },
    {
        title: "Billing & Subscriptions",
        description: "Manage your plan, view invoices, and update your payment methods.",
        icon: <FileText className="h-6 w-6 text-primary" />,
        href: "/me/settings?tab=subscription"
    },
    {
        title: "Contact Us",
        description: "Can't find what you're looking for? Our team is here to help.",
        icon: <MessageSquare className="h-6 w-6 text-primary" />,
        href: "mailto:support@entrestate.com"
    }
];

const BugReportForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call to the agent
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast({
            title: "Bug Report Submitted!",
            description: "Our AI Support Agent is analyzing the issue. A ticket has been created and you will be notified of any updates."
        });
        setIsLoading(false);
        setOpen(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g., Video export fails for Reel Ads tool" required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="area">Affected Area</Label>
                 <Select required>
                    <SelectTrigger id="area">
                        <SelectValue placeholder="Select a page or tool..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                        <SelectItem value="settings">Settings</SelectItem>
                        {tools.map(tool => (
                            <SelectItem key={tool.id} value={tool.id}>{tool.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea id="description" rows={5} placeholder="Please provide as much detail as possible, including the steps to reproduce the issue." required />
            </div>
             <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Report
                </Button>
            </DialogFooter>
        </form>
    );
};


export default function SupportPage() {
    const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full">
        <PageHeader
          title="Support Center"
          description="Your central hub for guides, documentation, and help with all our apps, solutions, and services."
          icon={<LifeBuoy className="h-8 w-8" />}
        />
        
        <div className="container mx-auto px-4 py-16 md:py-24 space-y-16">
            <section id="ai-agent">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <Card className="bg-card/80 backdrop-blur-lg border-primary/20 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3"><Bot className="h-7 w-7 text-primary"/> AI Support Agent</CardTitle>
                            <CardDescription>Have a question? Ask our AI assistant for an instant answer.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <form className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    placeholder='e.g., "How do I connect my Facebook account?"' 
                                    className="w-full h-12 pl-10 pr-4 text-base rounded-full"
                                />
                            </form>
                        </CardContent>
                    </Card>
                     <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                             <Card className="bg-card/80 backdrop-blur-lg shadow-lg cursor-pointer hover:border-primary/50 transition-colors">
                                <CardHeader>
                                    <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3"><Bug className="h-7 w-7 text-destructive"/> Technical Support Manager</CardTitle>
                                    <CardDescription>Found a bug or have a technical issue? Report it here.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full">
                                        <FileWarning className="mr-2 h-4 w-4"/>
                                        Report an Issue
                                    </Button>
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                        <DialogContent>
                             <DialogHeader>
                                <DialogTitle>Report a Technical Issue</DialogTitle>
                                <DialogDescription>
                                    Your report will be sent to our AI Support Agent for initial analysis and ticketing.
                                </DialogDescription>
                            </DialogHeader>
                            <BugReportForm setOpen={setDialogOpen} />
                        </DialogContent>
                    </Dialog>
                 </div>
            </section>
            
            <section id="topics">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Browse Support Topics</h2>
                    <p className="text-muted-foreground mt-2">Find guides and information about common questions.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {supportTopics.map(topic => (
                        <Link href={topic.href} key={topic.title}>
                            <Card className="h-full hover:border-primary/50 transition-colors hover:shadow-lg hover:-translate-y-1 bg-card/80">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            {topic.icon}
                                        </div>
                                        <CardTitle className="text-xl">{topic.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
