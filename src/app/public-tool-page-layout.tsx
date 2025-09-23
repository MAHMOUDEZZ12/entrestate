
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Plus, Sparkles, Wand2, CreditCard, Workflow, Clock2, Wallet, BadgeCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Feature, tools } from '@/lib/tools-client';
import { ShinyButton } from './ui/shiny-button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PurchaseDialog } from '@/components/ui/purchase-dialog';
import { AutoPilotPlan } from '@/components/ui/autopilot-plan';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


interface PublicToolPageLayoutProps {
  feature: Feature;
}

const ToolWorkflowSteps = ({ steps }: { steps: { icon: React.ReactNode, text: string }[] }) => {
    if (!steps || steps.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="w-full max-w-sm text-center"
                >
                    <Card className="bg-card/80 h-full">
                    <CardContent className="p-8">
                        <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                        {React.cloneElement(step.icon as React.ReactElement, { className: 'h-8 w-8 text-primary' })}
                        </div>
                        <h3 className="text-xl font-bold font-heading">Step {index + 1}</h3>
                        <p className="text-muted-foreground mt-2">{step.text}</p>
                    </CardContent>
                    </Card>
                </motion.div>
                {index < steps.length - 1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: (index * 0.2) + 0.1 }}
                        viewport={{ once: true }}
                        className="hidden md:block"
                    >
                    <ArrowRight className="h-8 w-8 text-muted-foreground" />
                    </motion.div>
                )}
                </React.Fragment>
            ))}
        </div>
    )
}


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
      <section className="relative py-20 md:py-32 text-center border-b overflow-hidden">
         <div 
            className="absolute inset-0 z-0"
            style={{
                background: `radial-gradient(ellipse at 50% 20%, ${feature.color}1A, transparent 70%)`
            }}
         />
        <div className="container mx-auto px-4 relative z-10">
          <div className="p-4 bg-card border rounded-full w-fit mx-auto mb-6 shadow-lg">
            {React.cloneElement(feature.icon, { className: 'h-10 w-10 text-primary' })}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter max-w-4xl mx-auto">
            {feature.title}
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/70">
            {feature.longDescription}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/login">
                <ShinyButton>
                    Get Started
                    <ArrowRight />
                </ShinyButton>
            </Link>
            {feature.price > 0 && (
                <PurchaseDialog tool={feature}>
                    <Button variant="outline" size="lg">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Buy for ${feature.price}/mo
                    </Button>
                </PurchaseDialog>
            )}
          </div>
        </div>
      </section>
      
       {/* How it works section */}
       <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">A Radically Simple Workflow</h2>
             <p className="mt-4 text-lg text-muted-foreground">Transform hours of manual work into a simple, elegant process powered by AI.</p>
          </div>
           {isAutoPilot ? <AutoPilotPlan /> : <ToolWorkflowSteps steps={feature.details.steps} />}
        </div>
      </section>

      {/* Use Cases Section */}
      {useCases.length > 0 && (
          <section className="py-24 md:py-32">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Powered for Professionals</h2>
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
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">The AI Advantage</h2>
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
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Build Powerful Flows</h2>
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
                     <h2 className="text-3xl md:text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Good to Know</h2>
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
