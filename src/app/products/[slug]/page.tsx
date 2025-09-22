
'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, Check, FileJson, MessageCircle, Telescope, Shield, Cpu, Workflow, BarChart } from 'lucide-react';
import { ShinyButton } from '@/components/ui/shiny-button';

const productsData: {[key: string]: any} = {
  'estchat-x3': {
    title: 'ESTCHAT X3 APP LITE',
    icon: <MessageCircle className="h-8 w-8" />,
    tagline: 'The Conversational Frontline',
    vision: 'chatENT X3 APP LITE exists to solve the timeless problem of communication in real estate. Too often, buyers, investors, and brokers are separated by channels, misaligned by language, and slowed down by complexity. This product was designed to unify all conversations into a single intelligent stream — one that is proactive, context-aware, and commercially productive.',
    dna: 'The DNA of chatENT is engagement-first intelligence. It doesn’t wait for the user to figure out what to ask; it guides, proposes, and translates. Whether on Instagram, a project landing page, or inside an enterprise learning dashboard, chatENT behaves as the frontline of interaction, never missing a lead, never losing a question, and always capturing intent.',
    productCore: [
      'Engages users on Instagram, websites, campaigns, landing pages, and CRMs.',
      'Includes a prompt builder for brokers and marketers to customize campaign dialogues.',
      'Translates every conversation into structured data, knowledge, or contracts.',
      'Evolves through use, continuously improving the accuracy of responses and the relevance of its proposals.',
      'chatENT is not a “bot.” It is an engagement infrastructure — one that can be scaled across agencies, developers, and regulators.'
    ],
    techStack: {
      'Frontend': 'React-based embeddable widget + Instagram/Facebook API connectors.',
      'Backend': 'Google Cloud Functions + Firebase for real-time data sync.',
      'AI Models': 'Gemini 1.5 Pro for intent recognition + fine-tuned smaller models for property FAQs and lead handling.',
      'Data Flow': 'User interacts via channel (Instagram, site, etc.). Input routed to AI Orchestration Layer (Genkit). AI analyzes, classifies, and either answers, escalates, or logs to CRM. Every interaction enriches the lead profile database.'
    },
    useCases: [
      { persona: 'The Homebuyer', query: '“2BR in Dubai Marina with balcony under AED 2M.”', experience: 'chatENT provides matching listings, side-by-side comparisons, and even school/lifestyle data.' },
      { persona: 'The Investor', query: '“What is ROI for Emaar Beachfront vs DAMAC Lagoons?”', experience: 'chatENT provides an investment comparison, then proposes creating a structured plan.' },
      { persona: 'The Broker/Agent', query: '“Help me create a listing for Palm Jumeirah penthouse.”', experience: 'chatENT uses its prompt builder to generate portal-ready listings, campaign copy, and ad creatives.'},
      { persona: 'The Regulator', query: '“How many new off-plan launches occurred in Q2 2024 in Dubai Marina?”', experience: 'chatENT generates an official market snapshot with references to the verified data registry.'},
    ],
    growthPath: [
        { tier: 'Lite (current)', description: 'Multi-channel chatbot + prompt builder.' },
        { tier: 'Pro', description: 'Deeper CRM integrations, campaign orchestration, AI video agents.' },
        { tier: 'Enterprise', description: 'Full regulatory dashboard integration, cross-market intelligence, white-label licensing.' },
    ],
  },
  'mega-listing-pro-2': {
    title: 'MEGA LISTING PRO 2',
    icon: <FileJson className="h-8 w-8" />,
    tagline: 'The Unified Market Registry',
    vision: 'The real estate market is fragmented by noise — duplicate listings, misleading ads, outdated properties, and inconsistent pricing. MEGA LISTING PRO 2 was born to create one single source of truth.',
    dna: 'Its DNA is market clarity. By consolidating, verifying, and archiving all listings, MEGA LISTING PRO 2 acts as the sovereign registry for real estate data. It does not merely collect; it filters, validates, and enforces accuracy, ensuring every participant — buyer, broker, investor, regulator — can operate from the same foundation of trust.',
    productCore: [
      'Aggregates listings from portals, developers, and brokers.',
      'Uses AI to detect duplicates, expired data, and false pricing.',
      'Outputs a clean, verified feed for websites, CRMs, and regulators.',
      'Archives every property record since 2005, preserving historical data for analytics.'
    ],
    techStack: {
      'Data Ingestion': 'APIs with portals (Bayut, Property Finder), scrapers for legacy sources, developer feeds.',
      'Verification Layer': 'AI-powered duplicate detection + price validation vs historical averages.',
      'Storage': 'Google Cloud Storage for raw feeds. BigQuery for structured and archived listings. Firestore for real-time updates.',
      'Access Points': 'API for enterprise clients. Web-based dashboard for SMEs. Regulatory view with audit logs.'
    },
    useCases: [
        { persona: 'The Buyer', query: 'Overwhelmed by duplicate or misleading listings.', experience: 'A single, verified property catalog.' },
        { persona: 'The Broker', query: 'Manual entry across portals wastes time.', experience: 'One upload → synchronized everywhere.' },
        { persona: 'The Investor', query: 'Lack of transparency in historical market data.', experience: 'Access to archived listings from 2005 onwards, enabling true price discovery.' },
        { persona: 'The Regulator', query: 'Market manipulation via inflated listings.', experience: 'A regulatory-grade feed, eliminating misleading or non-compliant ads.' },
    ],
     growthPath: [
        { tier: 'Lite', description: 'Aggregation + verification.' },
        { tier: 'Pro', description: 'Multi-platform syndication + archive API.' },
        { tier: 'Enterprise', description: 'White-label registry for governments and real estate authorities.' },
    ],
  },
  'pro-search-eng-x3': {
    title: 'PRO SEARCH ENG. x3',
    icon: <Telescope className="h-8 w-8" />,
    tagline: 'The Triple Engine of Discovery',
    vision: 'Search is the gateway to real estate intelligence. Yet most portals still rely on outdated keyword filters, leaving buyers with irrelevant results and investors without precision.',
    dna: 'Its DNA is precision with depth. Where traditional search ends at the listing, PRO SEARCH ENG. x 3 extends into prediction, history, and opportunity discovery.',
    productCore: [
      'Multi-Layered Engine: Each search type is optimized for different personas (Fast, Smart, Deep).',
      'Predictive Insights: Deep Search uses archived data + AI to project possible appreciation trends.',
      'Personalization: Search adjusts results based on buyer profile, investor goals, or broker preferences.',
      'Universal Connector: Works natively with MEGA LISTING PRO 2 and RECAIUS (Book 1).'
    ],
     techStack: {
      'Fast Search': 'ElasticSearch Cluster.',
      'Smart Search': 'OpenAI/Vertex AI NLP models for semantic + intent detection.',
      'Deep Search': 'BigQuery + ML models for trend predictions.',
      'Orchestration Layer': 'Directs user queries into one of the 3 engines or merges outputs dynamically.',
      'Front-End': 'Angular/React with instant UI filters, maps, and predictive graph overlays.'
    },
    useCases: [
      { persona: 'The Buyer', query: 'Wants speed and accuracy.', experience: 'Uses Fast Search for instant listings with filters like price, location, property type.' },
      { persona: 'The Investor', query: 'Seeks market timing.', experience: 'Uses Deep Search to ask: “Which areas under AED 2M will appreciate 15% in the next 3 years?”' },
      { persona: 'The Regulator', query: 'Needs transparency.', experience: 'Uses Smart Search to analyze misleading ads or filter by compliance flags.' },
      { persona: 'The Broker', query: 'Needs efficiency.', experience: 'Uses all three engines depending on whether serving a quick client, analyzing portfolios, or researching long-term opportunities.' },
    ],
     growthPath: [
        { tier: 'Phase 1', description: 'Launch Fast Search as core utility.' },
        { tier: 'Phase 2', description: 'Deploy Smart Search with AI natural language.' },
        { tier: 'Phase 3', description: 'Unlock Deep Search with premium investor dashboards.' },
    ],
  },
  'ebram-judicial-ai': {
    title: 'EBRAM JUDICIAL AI',
    icon: <Shield className="h-8 w-8" />,
    tagline: 'The Legal Nervous System',
    vision: 'Every real estate system is incomplete without law, enforcement, and permanence. Markets collapse when contracts are unclear, when disputes drag on, or when property lineage is lost.',
    dna: 'Its DNA is legal permanence. Once a property event enters EBRAM, it is undeniable, executable, and archived for 1,000 years.',
    productCore: [
      'Records every action on a property (sale, mortgage, lease, inheritance).',
      'Automates contracts by converting discussions and agreements into enforceable smart contracts.',
      'Enforces through binding digital rulings recognized by sovereign authorities.',
      'Archives full lineage of ownership, ensuring every property has a transparent 1,000-year memory.'
    ],
    techStack: {
      'Language Layer': 'EBRAM syntax (declarative + procedural rules).',
      'Execution Engine': 'Converts EBRAM scripts into smart contracts deployed on the blockchain layer.',
      'Database': 'Firestore for live property state. BigQuery for historical lineage. Blockchain anchor for immutability.',
      'Interface': 'Judicial Console for regulators. Contract Builder for brokers/developers. Inheritance & Family Rights Module for citizens.'
    },
    useCases: [
      { persona: 'The Citizen / Buyer', query: 'Buys a property', experience: 'EBRAM auto-generates the purchase contract, ownership certificate, and legal obligations.' },
      { persona: 'The Broker', query: 'Mediates a rental', experience: 'EBRAM creates a binding lease with built-in compliance and automatic expiry.' },
      { persona: 'The Regulator', query: 'Enforces a dispute', experience: 'EBRAM runs the contract history and issues a sovereign ruling in seconds.' },
      { persona: 'The Family / Heirs', query: 'Inheritance transfer', experience: 'EBRAM applies Sharia inheritance rules + national law automatically, ensuring fairness and speed.' },
    ],
    growthPath: [
        { tier: 'Phase 1', description: 'Automate rentals and sales.' },
        { tier: 'Phase 2', description: 'Extend to inheritance and family law.' },
        { tier: 'Phase 3', description: 'Launch as Judicial AI across sectors (beyond real estate).' },
    ],
  }
};


export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = productsData[slug];

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-16">
        <PageHeader
          title={product.title}
          description={product.tagline}
          icon={product.icon}
        />
        
        <section>
            <Card className="bg-card/50 backdrop-blur-lg border-primary/10 shadow-xl shadow-primary/10">
                 <CardContent className="p-8 md:p-10 space-y-4">
                    <h2 className="text-2xl font-bold text-foreground mb-4">The Vision & DNA</h2>
                    <p className="text-lg text-foreground/80">
                        {product.vision}
                    </p>
                    <p className="text-lg text-foreground/80">
                        {product.dna}
                    </p>
                 </CardContent>
            </Card>
        </section>

        <section>
             <h2 className="text-3xl font-bold text-center mb-8">Product Core</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.productCore.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <Check className="h-6 w-6 text-primary mt-1 shrink-0" />
                        <p className="text-lg text-foreground/90">{feature}</p>
                    </div>
                ))}
             </div>
        </section>

        <section>
            <h2 className="text-3xl font-bold text-center mb-8">Technology & Architecture</h2>
            <Card className="bg-card/50">
                <CardContent className="p-8 space-y-4">
                    {Object.entries(product.techStack).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                           <div className="font-semibold text-foreground/90 md:text-right md:pr-4 flex items-center md:justify-end gap-2"><Cpu className="h-4 w-4" />{key}</div>
                           <div className="md:col-span-2 text-muted-foreground">{String(value)}</div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </section>


         <section>
             <h2 className="text-3xl font-bold text-center mb-8">Personas & Use Cases</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product.useCases.map((useCase: any, index: number) => (
                    <Card key={index} className="bg-muted/50">
                        <CardHeader>
                            <CardTitle>{useCase.persona}</CardTitle>
                            <CardDescription>"{useCase.query}"</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold text-primary">The Experience:</p>
                            <p>{useCase.experience}</p>
                        </CardContent>
                    </Card>
                ))}
             </div>
        </section>

         <section>
             <h2 className="text-3xl font-bold text-center mb-8">Growth Path</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {product.growthPath.map((item: any, index: number) => (
                    <Card key={index} className="bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Workflow className="h-5 w-5 text-primary"/>
                                {item.tier}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                    </Card>
                ))}
             </div>
        </section>
        
        <section className="text-center py-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Ready to Integrate This Power?</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                Our core products form the backbone of the Entrestate ecosystem. Get started and experience the future of real estate technology.
            </p>
            <div className="mt-8">
                <Link href="/login">
                    <ShinyButton>
                        Start Your Free Trial <ArrowRight />
                    </ShinyButton>
                </Link>
            </div>
        </section>

      </main>
      <LandingFooter />
    </div>
  );
}
