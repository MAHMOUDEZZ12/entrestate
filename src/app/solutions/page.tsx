
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';

const faqs = [
    {
        question: "Is my data secure?",
        answer: "Yes. Your data, including uploaded documents and client lists, is kept strictly private. It is used only to power your personal AI tools and is never shared or used for training external models."
    },
    {
        question: "Can I cancel my subscription at any time?",
        answer: "Absolutely. You have full control over your subscription and can cancel at any time from your account settings. If you cancel, your subscription will remain active until the end of the current billing period."
    },
    {
        question: "How do the AI credits work?",
        answer: "Certain advanced AI features, like generating a video presenter or performing a deep market analysis, may consume AI credits. Your plan includes a monthly allotment of credits, and you can purchase more if needed."
    },
    {
        question: "Can I connect my own domain to the landing pages?",
        answer: "Yes, our Landing Page Builder supports custom domains. You can easily connect your own domain to publish professional, on-brand landing pages."
    },
    {
        question: "What kind of support do you offer?",
        answer: "We offer comprehensive support through our documentation, community forums, and direct email support for subscribers. Pro plan users receive priority support with faster response times."
    },
    {
        question: "Do I need technical skills to use the platform?",
        answer: "No. The entire Entrestate platform is designed to be intuitive and user-friendly for real estate professionals, not developers. If you can write an email, you can use our tools."
    }
];

export default function SolutionsPage() {
  return (
    <>
      <LandingHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
         <PageHeader
            title="Frequently Asked Questions"
            description="Find answers to common questions about our platform, features, and billing."
            icon={<HelpCircle className="h-8 w-8" />}
          />
        
        <div className="mt-12">
            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index} className="bg-card/80 backdrop-blur-lg border rounded-2xl shadow-lg shadow-primary/5">
                        <AccordionTrigger className="p-6 text-left hover:no-underline">
                            <h3 className="text-xl font-semibold font-heading">{faq.question}</h3>
                        </AccordionTrigger>
                        <AccordionContent className="p-6 pt-0">
                            <div className="border-t pt-4">
                                <p className="text-lg text-foreground/80">{faq.answer}</p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>

      </main>
      <LandingFooter />
    </>
  );
}
