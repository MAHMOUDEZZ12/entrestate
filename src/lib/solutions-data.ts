
export interface SolutionDetails {
    title: string;
    icon: string;
    tagline: string;
    vision: string;
    dna: string;
    productCore: string[];
    techStack: Record<string, string>;
    useCases: { persona: string; query: string; experience: string; }[];
    growthPath: { tier: string; description: string; }[];
    simulation: string;
    cta: { text: string; href: string; };
    price?: number;
}

export const solutionsData: Record<string, SolutionDetails> = {
  'estchat-x3': {
    title: 'ESTCHAT X3',
    icon: 'MessageCircle',
    tagline: 'The conversational frontline that unifies all communication into a single, intelligent, and commercially productive stream.',
    vision: 'Imagine hiring a super agent with 15 years market experience. He knows everything and comes with a learning dashboard. Use it in social media, landing pages, company site, or QR code on a business card.',
    dna: 'Its DNA is engagement-first intelligence. It doesn’t wait for the user to figure out what to ask; it guides, proposes, and translates. Whether on Instagram, a project landing page, or inside an enterprise learning dashboard, chatENT behaves as the frontline of interaction, never missing a lead, never losing a question, and always capturing intent.',
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
    simulation: 'EstChatSimulation',
    cta: { text: "Name your SuperAgent", href: "/me" },
    price: 149,
  },
  'mega-listing-pro-2': {
    title: 'MEGA LISTING PRO 2',
    icon: 'FileJson',
    tagline: 'From Listings to MEGA PRO Listings',
    vision: 'You don’t need more listings, you need a perfect listing manager. A listing is a little far beyond good images. It’s word sensitive and requires not less than stock market attention. Name a project, and click "list it". This is literally how it works.',
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
    simulation: 'MegaListingSimulation',
    cta: { text: "Use it to stop blaming Portals", href: "/me" },
    price: 68,
  },
  'pro-search-eng-x3': {
    title: 'PRO SEARCH ENG. x3',
    icon: 'Telescope',
    tagline: 'We turned the untouched search bar into unmatched search engine',
    vision: 'This model switches the life on your website. We added a decentralized market library to it. Try our discovery search to see how it works!',
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
    simulation: 'ProSearchSimulation',
    cta: { text: "let's Go", href: "/me" },
    price: 190,
  }
};

export const solutions = Object.entries(solutionsData).map(([slug, data]) => ({
    slug,
    title: data.title,
    description: data.tagline,
}));
