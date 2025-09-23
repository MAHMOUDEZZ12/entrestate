
'use client';

import React from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BookOpen, MessageSquare, Newspaper, Check } from 'lucide-react';
import { ShinyButton } from '@/components/ui/shiny-button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { tools } from '@/lib/tools-data';
import { marketingSuites } from '@/lib/suites-data';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { DashboardServiceCard } from '@/components/ui/dashboard-service-card';
import { tools as allTools } from '@/lib/tools-client';

export default function SuiteDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const suite = marketingSuites.find(s => s.id === slug);
  if (!suite) {
    notFound();
  }

  const suiteTools = allTools.filter(tool => tool.suite === suite.name);
  const [addedApps, setAddedApps] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    const savedState = localStorage.getItem('addedApps');
    if (savedState) {
        setAddedApps(JSON.parse(savedState));
    }
  }, []);

  const handleSetIsAdded = (toolId: string, isAdded: boolean) => {
    const newAddedApps = isAdded 
        ? [...addedApps, toolId]
        : addedApps.filter(id => id !== toolId);
    setAddedApps(newAddedApps);
    localStorage.setItem('addedApps', JSON.stringify(newAddedApps));
  }

  
  const appsThatNeedConnection: { [key: string]: string } = {
    'meta-ads-copilot': 'Facebook',
    'audience-creator': 'Facebook',
    'insta-ads-designer': 'Instagram',
    'instagram-admin-ai': 'Instagram',
    'email-creator': 'Gmail / Outlook',
    'whatsapp-manager': 'WhatsApp Business',
  };


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full">
        <PageHeader
          title={suite.name}
          description={suite.description}
          icon={React.createElement(suite.icon, { className: 'h-8 w-8' })}
        />

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Apps Included in This Suite</h2>
                    <p className="mt-4 text-lg text-muted-foreground">This is the complete arsenal of tools you unlock.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {suiteTools.map(tool => (
                         <DashboardServiceCard 
                            key={tool.id} 
                            tool={tool}
                            isAdded={addedApps.includes(tool.id)}
                            setIsAdded={(isAdded) => handleSetIsAdded(tool.id, isAdded)}
                            connectionRequired={appsThatNeedConnection[tool.id]}
                            paymentRequired={true} // Assume all apps on this page are part of a paid suite
                        />
                    ))}
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Dedicated Resources</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Each Suite comes with its own universe of knowledge.</p>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Newspaper /> Suite News & Blog</CardTitle>
                        </CardHeader>
                        <CardContent><p className="text-muted-foreground">The latest updates, strategies, and success stories related to the {suite.name}.</p></CardContent>
                        <CardFooter><Button variant="outline" asChild><Link href="/blog">Go to Blog</Link></Button></CardFooter>
                    </Card>
                     <Card>
                        <CardHeader>
                             <CardTitle className="flex items-center gap-2"><BookOpen /> Suite Documentation</CardTitle>
                        </CardHeader>
                        <CardContent><p className="text-muted-foreground">In-depth technical guides and API references for every tool in this suite.</p></CardContent>
                        <CardFooter><Button variant="outline" asChild><Link href="/documentation">Go to Docs</Link></Button></CardFooter>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><MessageSquare /> Suite Support</CardTitle>
                        </CardHeader>
                        <CardContent><p className="text-muted-foreground">Get specialized help from our support team who are experts in the {suite.name}.</p></CardContent>
                        <CardFooter><Button variant="outline" asChild><Link href="/support">Contact Support</Link></Button></CardFooter>
                    </Card>
                 </div>
            </div>
        </section>
        
        <section className="py-24">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Ready to Master This Suite?</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Acquire the {suite.name} to add these powerful tools to your dashboard and supercharge your workflow.</p>
                <div className="mt-8">
                    <Link href="/pricing">
                        <ShinyButton>
                            View Plans & Pricing <ArrowRight />
                        </ShinyButton>
                    </Link>
                </div>
            </div>
        </section>
        
      </main>
      <LandingFooter />
    </div>
  );
}
