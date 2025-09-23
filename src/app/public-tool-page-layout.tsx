
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Plus, Sparkles, Wand2, CreditCard, Workflow, Clock2, Wallet, BadgeCheck, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Feature, tools } from '@/lib/tools-client';
import { ShinyButton } from './components/ui/shiny-button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { LandingHeader } from './components/landing-header';
import { LandingFooter } from './components/landing-footer';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './components/ui/carousel';
import { CodeBlock } from './components/code-block';
import { useToast } from './hooks/use-toast';
import Image from 'next/image';


interface PublicToolPageLayoutProps {
  feature: Feature & { price: number };
}


const ToolShowcase = ({ feature }: { feature: Feature }) => {
    // Simple examples. In a real app, these would be more detailed and specific.
    const examples = [
        {
            title: "Generate a Luxury Ad",
            description: "Create a high-end, professional ad for a luxury property.",
            input: `{\n  "projectName": "Emaar Beachfront",\n  "focusArea": "Luxury amenities",\n  "toneOfVoice": "Luxury"\n}`,
            outputImage: "https://picsum.photos/seed/luxury-ad/800/450",
            imageHint: "luxury apartment interior"
        },
        {
            title: "Create a Market Report",
            description: "Generate an in-depth market report for a specific area.",
            input: `{\n  "location": "Dubai Marina",\n  "propertyType": "Luxury Condos",\n  "reportType": "Investor"\n}`,
            outputImage: "https://picsum.photos/seed/market-report/800/450",
            imageHint: "dubai skyline"
        },
        {
            title: "Build a Landing Page",
            description: "Quickly generate a landing page for a new development.",
            input: `{\n  "projectName": "DAMAC Hills 2",\n  "projectDetails": "3-bedroom villas with lagoon access",\n  "brandingStyle": "Modern & Minimalist"\n}`,
            outputImage: "https://picsum.photos/seed/villa-exterior/800/450",
            imageHint: "modern villa exterior"
        }
    ];

    return (
        <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-6 md:p-10">
                <Carousel>
                    <CarouselContent>
                        {examples.map((ex, index) => (
                            <CarouselItem key={index}>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">{ex.title}</h4>
                                        <p className="text-muted-foreground mb-4">{ex.description}</p>
                                        <Label className="text-sm">Example Input</Label>
                                        <CodeBlock>{ex.input}</CodeBlock>
                                    </div>
                                    <div>
                                        <Label className="text-sm">Example Output</Label>
                                        <div className="mt-2 aspect-video relative rounded-lg overflow-hidden border shadow-lg">
                                            <Image src={ex.outputImage} alt={ex.title} layout="fill" objectFit="cover" data-ai-hint={ex.imageHint} />
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2"/>
                </Carousel>
            </CardContent>
        </Card>
    )
}

const PurchaseCard = ({ feature }: { feature: Feature & { price: number } }) => {
    const [isProcessing, setIsProcessing] = React.useState(false);
    const { toast } = useToast();

    const handlePurchase = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsProcessing(false);
        toast({
            title: 'Purchase Successful!',
            description: `You have successfully purchased "${feature.title}". You can now access it in your dashboard.`,
        });
    };
    
    if (feature.price <= 0) {
        return (
             <Card className="bg-card/80 backdrop-blur-lg">
                <CardHeader>
                    <CardTitle>Get Started</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">This app is free! Log in or sign up to add it to your dashboard.</p>
                </CardContent>
                <CardFooter>
                     <Link href="/login" className="w-full">
                        <Button size="lg" className="w-full">
                            Get Started Free <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card className="bg-card/80 backdrop-blur-lg">
            <CardHeader>
                <CardTitle>Purchase "{feature.title}"</CardTitle>
                <CardDescription>Get single access to this tool.</CardDescription>
            </CardHeader>
            <form onSubmit={handlePurchase}>
                <CardContent className="space-y-4">
                     <div className="text-center bg-muted/50 p-4 rounded-lg">
                        <p className="text-muted-foreground">Total amount</p>
                        <p className="text-3xl font-bold font-heading text-primary">${feature.price.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">per month</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="card-details">Card Details</Label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="card-details" placeholder="Card Number" className="pl-10" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="MM / YY" required />
                            <Input placeholder="CVC" required />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isProcessing} className="w-full" size="lg">
                    {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isProcessing ? 'Processing...' : `Pay $${feature.price.toFixed(2)}`}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};


export function PublicToolPageLayout({ feature }: PublicToolPageLayoutProps) {
  const isAutoPilot = feature.id === 'meta-auto-pilot';

  const faqs = feature.details.faqs || [];
  const useCases = feature.details.use_cases || [];
  const aiVsManual = feature.details.aiVsManual || [];
  const synergy = feature.details.synergy || [];

  return (
    <div className="flex min-h-screen flex-col bg-background">
    <LandingHeader />
    <main className="flex-1 w-full bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 border-b overflow-hidden">
         <div 
            className="absolute inset-0 z-0"
            style={{
                background: `radial-gradient(ellipse at 50% 20%, ${feature.color}1A, transparent 70%)`
            }}
         />
        <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-center">
                <div className="lg:col-span-2 text-center lg:text-left">
                     <div className="p-4 bg-card border rounded-full w-fit mx-auto lg:mx-0 mb-6 shadow-lg">
                        {React.cloneElement(feature.icon, { className: 'h-10 w-10 text-primary' })}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter max-w-4xl">
                        {feature.title}
                    </h1>
                    <p className="mt-6 max-w-3xl text-lg md:text-xl text-foreground/70">
                        {feature.longDescription}
                    </p>
                </div>
                <div className="lg:col-span-1">
                    <PurchaseCard feature={feature} />
                </div>
            </div>
        </div>
      </section>
      
       {/* How it works section */}
       <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">A Radically Simple Workflow</h2>
             <p className="mt-4 text-lg text-muted-foreground">Transform hours of manual work into a simple, elegant process powered by AI.</p>
          </div>
           <ToolShowcase feature={feature} />
        </div>
      </section>

      {/* Use Cases Section */}
      {useCases.length > 0 && (
          <section className="py-24 md:py-32">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Powered for Professionals</h2>
                 <p className="mt-4 text-lg text-muted-foreground">From individual agents to large brokerages, see how {feature.title} is a game-changer.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {useCases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <Card className="bg-card/80 h-full">
                      <CardHeader>
                        <CardTitle className="flex items-start gap-3">
                          <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                          <span>{useCase}</span>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
      )}

      {/* AI vs Manual */}
       {aiVsManual.length > 0 && (
            <section className="py-24 md:py-32 bg-muted/30">
                <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">The AI Advantage</h2>
                        <p className="mt-4 text-lg text-muted-foreground">See how much time and effort you save by using the AI.</p>
                    </div>
                    <Card className="max-w-4xl mx-auto bg-card/80 backdrop-blur-lg">
                        <CardContent className="p-2">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">Metric</TableHead>
                                        <TableHead>Manual Process</TableHead>
                                        <TableHead className="text-primary">With Entrestate AI</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {aiVsManual.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-semibold flex items-center gap-2">
                                                {item.icon ? React.cloneElement(item.icon as React.ReactElement, { className: 'h-5 w-5' }) : null}
                                                {item.metric}
                                            </TableCell>
                                            <TableCell>{item.manual}</TableCell>
                                            <TableCell className="font-semibold text-primary">{item.ai}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </section>
        )}


      {/* Flows Section */}
      {synergy.length > 0 && (
          <section className="py-24 md:py-32">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Build Powerful Flows</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                  Connect {feature.title} with other apps to create automated workflows that run your business on autopilot.
                </p>
                <div className="mt-12">
                     <Card className="max-w-2xl mx-auto bg-card/80">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-center flex-wrap gap-4">
                            {(synergy.slice(0, 2).map((s, index) => {
                                const relatedTool = tools.find(t => t.title === s.tool);
                                return (
                                    <React.Fragment key={index}>
                                    <div className="flex flex-col items-center gap-2">
                                         <div className="p-3 rounded-lg text-white" style={{ backgroundColor: feature.color }}>
                                           {React.cloneElement(feature.icon, { className: 'h-6 w-6' })}
                                         </div>
                                         <p className="text-xs font-semibold">{feature.title}</p>
                                     </div>
                                     <Plus className="h-6 w-6 text-muted-foreground" />
                                    <div className="flex flex-col items-center gap-2">
                                         <div className="p-3 rounded-lg text-white" style={{ backgroundColor: relatedTool?.color || 'hsl(var(--secondary))' }}>
                                           {relatedTool ? React.cloneElement(relatedTool.icon, { className: 'h-6 w-6' }) : <Sparkles className="h-6 w-6" />}
                                         </div>
                                         <p className="text-xs font-semibold">{s.tool}</p>
                                     </div>
                                   </React.Fragment>
                                )
                            }))}
                            </div>
                            <p className="text-sm text-muted-foreground mt-4">{synergy[0]?.benefit || "Combine tools to create powerful automations."}</p>
                        </CardContent>
                        <CardFooter>
                             <Link href="/dashboard/flows" className="w-full">
                                <Button variant="outline" className="w-full">
                                    <Workflow className="mr-2 h-4 w-4" />
                                    Go to Flow Builder
                                </Button>
                            </Link>
                        </CardFooter>
                     </Card>
                </div>
            </div>
          </section>
      )}
      
       {/* FAQ Section */}
      {faqs.length > 0 && (
          <section className="py-24 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4">
                 <div className="text-center max-w-2xl mx-auto mb-16">
                     <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Good to Know</h2>
                     <p className="mt-4 text-lg text-muted-foreground">Answers to common questions.</p>
                </div>
                <Card className="max-w-3xl mx-auto bg-card">
                    <CardContent className="p-6">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger className="text-left text-lg hover:no-underline">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground">
                                        <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
          </section>
      )}

    </main>
    <LandingFooter />
    </div>
  );
}
