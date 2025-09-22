
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { HelpCircle, Building, Sparkles, CreditCard, School, Shield, Network } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';

const faqData = [
    {
        category: 'Company and System',
        icon: <Building className="h-6 w-6" />,
        faqs: [
            {
                question: "What is Entrestate?",
                answer: "Entrestate is an AI-native operating system designed for the real estate industry. It integrates market intelligence, creative tooling, and campaign automation into a single, seamless cockpit to give professionals an unparalleled advantage."
            },
            {
                question: "How does the system work?",
                answer: "Our system is built on a modular, event-driven architecture. Each tool is an AI-powered 'Service Card' that connects to a central core of your data (your Brand Kit, Projects, etc.). You can use these cards individually or chain them together in automated 'Flows' to perform complex tasks."
            },
            {
                question: "Who is Entrestate for?",
                answer: "Entrestate is designed for the entire real estate ecosystem: individual agents who want to automate their marketing, brokerages looking to empower their teams with consistent tools, and developers needing to manage portfolios and launch large-scale campaigns."
            },
            {
                question: "How can I check if the platform is experiencing issues?",
                answer: "You can visit our real-time System Status page at any time to see the current operational status of all our services, from the core platform APIs to the AI models."
            }
        ]
    },
    {
        category: 'Apps and Products',
        icon: <Sparkles className="h-6 w-6" />,
        faqs: [
            {
                question: "What is the difference between an App, a Flow, and a Pilot?",
                answer: "An 'App' is a single tool that performs a specific task (e.g., Insta Ads Designer). A 'Flow' is an automated workflow you can build by chaining multiple apps together in the Flow Builder. A 'Pilot' is a master AI orchestrator, like the Meta Auto Pilot, that can intelligently run other tools in a sequence to achieve a high-level goal."
            },
            {
                question: "Can I suggest a new app or feature?",
                answer: "Absolutely. We are constantly building and improving. You can assign tasks and suggest new features directly to our team via the Dev Admin dashboard, which is your shared workspace with our AI development team."
            },
             {
                question: "How do I add an app to my dashboard?",
                answer: "You can browse all available tools in the 'Apps' section of your dashboard. Simply click 'Add' on any tool, and it will appear on your main 'Home' dashboard for quick access."
            },
            {
                question: "What are the core product pillars?",
                answer: "Our ecosystem is built on three core products: PRO SEARCH ENG. x3 (our intelligent discovery engine), ESTCHAT X3 (our multi-channel conversational AI), and MEGA LISTING PRO 2 (our unified market registry). The apps in the suite leverage the power of these core systems."
            }
        ]
    },
    {
        category: 'Payment and Points',
        icon: <CreditCard className="h-6 w-6" />,
        faqs: [
             {
                question: "How does your pricing work?",
                answer: "We offer flexible pricing. You can subscribe to individual apps, purchase bundles for specific needs (like Marketing or Creative), or unlock the entire suite with our Pro plan. Visit our Pricing page for full details."
            },
            {
                question: "What is your refund policy?",
                answer: "As per our Terms of Service, we do not offer refunds. Your subscription compensates for the ongoing availability and development of the suite. We are committed to resolving any service failures in a timely manner."
            },
            {
                question: "What are Market IQ Points?",
                answer: "Market IQ Points are part of our rewards system. You can earn points by participating in community activities, completing courses in the Academy, or engaging in special promotions. These points can be redeemed for discounts or other perks."
            },
            {
                question: "Can I change my plan at any time?",
                answer: "Yes, you can upgrade, downgrade, or change your app subscriptions at any time through the 'Subscription' tab in your dashboard settings. Changes will be prorated accordingly."
            }
        ]
    },
    {
        category: 'Academy and Community',
        icon: <School className="h-6 w-6" />,
        faqs: [
            {
                question: "What is the Entrestate Academy?",
                answer: "The Academy is our educational hub, offering structured courses on mastering the real estate market, from developer relations to AI strategy. Completing courses can earn you certifications and unlock benefits."
            },
            {
                question: "How can I join the community?",
                answer: "All users can access our Community Notes page to connect with other professionals, ask questions, and share insights. It's a network of forward-thinking real estate experts."
            },
            {
                question: "What is the purpose of the Dev Admin dashboard?",
                answer: "The Dev Admin dashboard is a unique, shared workspace between you and our development team. It's where you can assign tasks, report issues, and see a real-time log of the work being done on the platform, fostering a collaborative building process."
            }
        ]
    },
    {
        category: 'Data and Privacy',
        icon: <Shield className="h-6 w-6" />,
        faqs: [
            {
                question: "Is my data secure?",
                answer: "Yes. Your data, including uploaded documents and client lists, is kept strictly private. It is used only to power your personal AI tools and is never shared or used for training external models."
            },
            {
                question: "How is my private data used?",
                answer: "Your proprietary data (e.g., from your Brand Kit or uploaded documents) is used to provide context to your private AI assistant, ensuring the content it generates is hyper-relevant to you. This data is firewalled and is not accessible by other users."
            },
            {
                question: "Where is my data stored?",
                answer: "All user data is securely stored on Google Cloud's infrastructure, benefiting from their world-class security and compliance standards."
            }
        ]
    },
    {
        category: 'API and Integration',
        icon: <Network className="h-6 w-6" />,
        faqs: [
             {
                question: "Do you have a public API?",
                answer: "A public API for developers is on our roadmap and will allow third parties to build on the Entrestate platform. Check our Roadmap page for the latest updates."
            },
            {
                question: "How do I connect my social media or ad accounts?",
                answer: "You can manage all external connections in your dashboard settings. We use secure OAuth for services like Google and Meta, meaning we never see or store your passwords. For other services, you may need to provide a secure API key."
            },
            {
                question: "What CRMs can I integrate with?",
                answer: "We are building out two-way sync integrations with popular CRMs like Salesforce and HubSpot. Please check our Roadmap for the latest status on these integrations."
            }
        ]
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
        
        <div className="mt-12 space-y-16">
            {faqData.map(category => (
                <section key={category.category} id={category.category.toLowerCase().replace(/\s/g, '-')}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-primary/10 text-primary rounded-lg">
                           {category.icon}
                        </div>
                        <h2 className="text-3xl font-bold font-heading">{category.category}</h2>
                    </div>
                     <Accordion type="single" collapsible className="w-full space-y-4">
                        {category.faqs.map((faq, index) => (
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
                </section>
            ))}
        </div>

      </main>
      <LandingFooter />
    </>
  );
}
