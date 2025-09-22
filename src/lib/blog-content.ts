
export const appDetails = {
  "apps": [
    {
      "name": "Meta Auto Pilot",
      "hero": "Meta Auto Pilot — The single-click manager for your entire Meta suite.",
      "full_description": "Meta Auto Pilot is an AI-driven command center that launches, optimizes, and reports on Facebook & Instagram campaigns with a single action. It collapses Ads Manager complexity into a guided, automated workflow that manages audience splitting, budget allocation, ad rotation, and reporting in real time.",
      "level_of_knowledge_required": "Zero. Designed for users with no Ads Manager experience; the app provides smart defaults and plain-language guidance.",
      "difference_vs_native": "Native Ads Manager requires manual setup, daily monitoring, and expertise. Meta Auto Pilot automates setup, continuous optimization and plain-language reporting, while still allowing advanced users to inspect and override.",
      "flow": "Audience Creator produces target segments. Then, Insta Ads Designer or Reel Ads produces creatives matched to each segment. Next, Meta Auto Pilot launches campaigns across Facebook & Instagram with one click, auto-allocates budget, and rotates creatives. CRM Memory captures leads and tags the source. Finally, WhatsApp Manager triggers follow-up journeys.",
      "chain": "Audience Creator → Insta Ads Designer → Meta Auto Pilot → CRM Memory",
      "expected_results": "Standalone: 85–90% optimization (vs native manual: ~40–50%). Full flow (Audience + Designer + CRM): 95–98% efficiency with up to 2x–3x better ROI and significant reduction of wasted spend.",
      "features": [
        "One-click campaign creation across Facebook & Instagram",
        "Auto-budget optimization and pacing",
        "AI-driven targeting and audience refinement",
        "Dynamic creative rotation",
        "Plain-language reporting and alerts",
        "Native CRM sync and tagging"
      ],
      "demo_placeholder": "Dashboard screenshot + one-click launch animation",
      "use_cases": [
        "Salesperson launching lead-gen campaigns with zero training",
        "Marketer scaling multiple creatives and audiences",
        "Agency managing many clients from one console"
      ],
      "faqs": [
        { "q": "Do I need Ads Manager experience?", "a": "No. Meta Auto Pilot is built for zero-knowledge entrants while offering advanced controls for power users." },
        { "q": "Can I still use Ads Manager?", "a": "Yes — you can import/export and inspect campaigns; Auto Pilot simply handles day-to-day optimization." },
        { "q": "How quickly will I see results?", "a": "You’ll see initial performance within 24–72 hours; optimization improves over the first 7–14 days." }
      ],
      "integrations": [
        "Meta Ads API",
        "Audience Creator",
        "Insta Ads Designer",
        "Reel Ads",
        "CRM Memory",
        "WhatsApp Manager"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Campaign Builder",
      "hero": "Campaign Builder — Your dedicated agent for Facebook & Instagram advertising.",
      "full_description": "Campaign Builder is a guided, modular campaign creation tool that gives you full control over strategy while removing repetitive setup tasks. It provides templates for common objectives (leads, traffic, conversions), automates A/B structures, and generates field-accurate campaign specs for direct launch or handoff to Meta Auto Pilot.",
      "level_of_knowledge_required": "Low. Basic marketing concepts are helpful but not required; templates and guided flows do most of the heavy lifting.",
      "difference_vs_native": "Unlike native Ads Manager where you manually create each ad set and ad, Campaign Builder offers pre-configured blueprints, automated split-testing, and one-click export to Meta Auto Pilot or Ads Manager.",
      "flow": "Choose objective template (Lead, Awareness, Conversion). Select audiences from Audience Creator or upload your own. Assign creatives from Insta Ads Designer or Reel Ads. Review automated split tests and budgets. Export to Meta Auto Pilot or Meta Ads Manager.",
      "chain": "Audience Creator → Insta Ads Designer → Campaign Builder → Meta Auto Pilot",
      "expected_results": "Using templates: 70–85% reduction in setup time and 20–40% performance improvement over manual ad setups. Chained with Meta Auto Pilot: aligns to 90%+ campaign efficiency.",
      "features": [
        "Objective-based templates",
        "Automated A/B split-testing scaffolds",
        "Audience import and segmentation",
        "Creative assignment and preview",
        "One-click export to launch"
      ],
      "demo_placeholder": "Template selection and A/B matrix preview",
      "use_cases": [
        "Marketing teams standardizing campaign rollouts",
        "SMBs launching repeatable ad funnels",
        "Agencies creating client-friendly blueprints"
      ],
      "faqs": [
        { "q": "Can I customize templates?", "a": "Yes — templates are fully editable and saveable as custom blueprints." },
        { "q": "Does it handle budgeting?", "a": "Yes — budgets can be auto-suggested or manually set across splits." }
      ],
      "integrations": [
        "Audience Creator",
        "Meta Auto Pilot",
        "Insta Ads Designer",
        "CRM Memory"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Audience Creator",
      "hero": "Audience Creator — Find high-intent buyers before they search.",
      "full_description": "Audience Creator uses first-party signals, lookalike modeling, and contextual intent markers to build high-probability buyer segments. It surfaces audiences that are likely to convert and provides clear explanations for why each segment matters.",
      "level_of_knowledge_required": "Zero to Low. The interface explains each audience and recommended use; advanced users can tweak parameters.",
      "difference_vs_native": "Native audience tools rely mainly on platform-provided signals. Audience Creator fuses platform signals with your CRM Memory and Market Library insights to create higher-intent segments.",
      "flow": "Import CRM Memory lists or provide seed customers. Choose intent filters (behavioral, demographic, property type). Build lookalikes and layered segments. Export directly to Meta Auto Pilot or Campaign Builder.",
      "chain": "CRM Memory → Audience Creator → Campaign Builder",
      "expected_results": "Standalone boosts CTR and CVR by 30–50% vs generic audiences. In full flow, reduces wasted impressions leading to 20–40% lower CPA.",
      "features": [
        "Seed-based lookalike creation",
        "Intent-based filters and scoring",
        "Cross-platform audience export",
        "Audience quality scoring and rationale"
      ],
      "demo_placeholder": "Audience builder with seed upload and quality score chart",
      "use_cases": [
        "Agents targeting high-intent buyers for new launches",
        "Teams personalizing creatives to audience segments",
        "Agencies improving client ad efficiency"
      ],
      "faqs": [
        { "q": "Do I need customer lists?", "a": "You can use seed customers for best results, but the tool can also create audiences from public signals." },
        { "q": "Can I update audiences automatically?", "a": "Yes — audiences can auto-refresh from CRM Memory or data feeds." }
      ],
      "integrations": [
        "CRM Memory",
        "Meta Auto Pilot",
        "Campaign Builder",
        "Market Library"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Insta Ads Designer",
      "hero": "Insta Ads Designer — Create perfect ads for Instagram Stories & Feed.",
      "full_description": "Insta Ads Designer produces platform-optimized visuals and copy for Instagram Feed and Stories. The tool applies best-practice aspect ratios, text-to-image balance, animation presets, and split-tested copy variants to deliver creatives that convert.",
      "level_of_knowledge_required": "Zero. Drag-and-drop templates, auto-copy suggestions, and smart layout protect you from common creative mistakes.",
      "difference_vs_native": "Native creative tools give raw assets. Insta Ads Designer provides finished, ad-ready creatives tailored to Instagram’s formats and conversion behaviors.",
      "flow": "Select campaign objective and audience. Choose templates and upload assets or generate visuals. Use auto-suggested copy and CTAs tuned to the audience. Export as creative sets to Meta Auto Pilot or Campaign Builder.",
      "chain": "Audience Creator → Insta Ads Designer → Campaign Builder",
      "expected_results": "Well-constructed creatives from this tool typically increase engagement 25–60% over unoptimized assets and lift conversion rates when matched to audience segments.",
      "features": [
        "Platform-optimized templates (Feed & Stories)",
        "Auto-copy & CTA suggestions",
        "Animation presets for Stories",
        "Creative set export and naming conventions"
      ],
      "demo_placeholder": "Creative editor with template gallery and preview",
      "use_cases": [
        "SMBs needing quick, high-quality creatives",
        "Marketers running multiple ad variants",
        "Agencies producing white-label ad sets"
      ],
      "faqs": [
        { "q": "Does it produce captions and hashtags?", "a": "Yes — copy generation includes captions and hashtag recommendations." },
        { "q": "Can I preview creatives on Instagram mockups?", "a": "Yes — device previews for Feed and Stories are built in." }
      ],
      "integrations": [
        "Campaign Builder",
        "Meta Auto Pilot",
        "Audience Creator",
        "Reel Ads"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Reel Ads",
      "hero": "Reel Ads — Generate engaging video ads for Instagram Reels.",
      "full_description": "Reel Ads automates short-form video ad creation optimized for Reels' vertical, mobile-first format. It combines UGC-style templates, motion presets, and AI-driven storyboard suggestions to produce high-retention reels that drive action.",
      "level_of_knowledge_required": "Zero. Choose a template, select assets or let the AI assemble them, then export to Meta Auto Pilot.",
      "difference_vs_native": "Native video editors are general-purpose. Reel Ads focuses on Reels-specific engagement patterns, pacing, and creative hooks proven to perform.",
      "flow": "Select format and hook style. Provide assets or script via UGC Script Writer. Apply motion presets and brand kit from Brand Creator or Automated Rebranding. Export to Campaign Builder or Meta Auto Pilot.",
      "chain": "UGC Script Writer → Reel Ads → Meta Auto Pilot",
      "expected_results": "Reels made with best-practice hooks and pacing can increase view-through and conversion by 2x vs repurposed long-form video. Expect higher CTRs especially in discovery campaigns.",
      "features": [
        "UGC-style templates and pacing presets",
        "Auto-subtitle generator",
        "Storyboard & scene suggestions",
        "Direct export to Meta Auto Pilot"
      ],
      "demo_placeholder": "Vertical reel storyboard preview with pacing timeline",
      "use_cases": [
        "Brands focused on awareness and discovery",
        "Agencies creating scalable short-form video",
        "Listings needing high-exposure video assets"
      ],
      "faqs": [
        { "q": "Can I edit subtitles and captions?", "a": "Yes — subtitles are editable prior to export." },
        { "q": "Are there size or length limits?", "a": "Reel Ads adheres to platform limits and auto-trims as needed." }
      ],
      "integrations": [
        "UGC Script Writer",
        "Brand Creator",
        "Meta Auto Pilot",
        "Campaign Builder"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Instagram Admin AI",
      "hero": "Instagram Admin — Schedules posts and handles replies on Instagram.",
      "full_description": "Instagram Admin centralizes content scheduling, comment management, DMs, and analytics. It provides queue management, approval flows, reply templates, sentiment tagging, and SLA automation for response times.",
      "level_of_knowledge_required": "Zero. Scheduling and reply templates make it approachable for teams of any size.",
      "difference_vs_native": "Native Creator Studio provides scheduling but limited team workflows. Instagram Admin adds multi-user approvals, reply automation, sentiment analysis, and campaign tagging tied to CRM Memory.",
      "flow": "Plan content in Story Planner or Landing Page Builder. Schedule posts via Instagram Admin. Monitor replies and route leads to CRM Memory. Feed performance into Market Reports.",
      "chain": "Story Planner → Instagram Admin AI → CRM Memory",
      "expected_results": "Improved engagement response times (automated replies reduce response time by 60–90%) and increased consistency of posting which improves audience retention over time.",
      "features": [
        "Post scheduling and calendar",
        "Team approval workflow",
        "Auto-reply templates and sentiment routing",
        "Native analytics and CRM tagging"
      ],
      "demo_placeholder": "Publishing calendar with approval workflow view",
      "use_cases": [
        "Social managers scheduling multi-format content",
        "Agencies managing multiple brand accounts",
        "Sales teams handling social lead routing"
      ],
      "faqs": [
        { "q": "Does it support DMs and comments?", "a": "Yes — unified inbox for DMs and comments with tagging." },
        { "q": "Can we set response SLAs?", "a": "Yes — set automated SLAs and escalation rules." }
      ],
      "integrations": [
        "Story Planner",
        "CRM Memory",
        "Market Reports",
        "WhatsApp Manager"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Story Planner",
      "hero": "Story Planner — Plan and design animated Instagram stories.",
      "full_description": "Story Planner is a storyboard-first tool for designing multi-frame, animated Instagram Stories with template-driven transitions, CTA frames, and auto-export-ready segments for Ads Manager or Instagram Admin.",
      "level_of_knowledge_required": "Zero. Templates and smart animation presets remove the need for motion-design expertise.",
      "difference_vs_native": "Native story creation on Instagram is manual and single-frame. Story Planner supports multi-frame story arcs, animation easing presets, and ad-ready export naming conventions.",
      "flow": "Choose story sequence template (teaser, walkthrough, listing). Add frames, apply animation presets, and assign CTAs. Export frames as ad sets to Insta Ads Designer or schedule via Instagram Admin.",
      "chain": "Insta Ads Designer → Story Planner → Instagram Admin AI",
      "expected_results": "Story-driven ad sequences typically increase completion rates and higher intent interactions. Expect 20–50% higher swipe-up / CTA interaction when using story arcs vs static frames.",
      "features": [
        "Multi-frame storyboard editor",
        "Animation and transition presets",
        "CTA frame templates",
        "Export for ads and organic posting"
      ],
      "demo_placeholder": "Story sequence timeline with animated preview",
      "use_cases": [
        "Real estate listings telling a visual narrative",
        "Product launches using story arcs",
        "Social campaigns requiring quick animated content"
      ],
      "faqs": [
        { "q": "Can animations be exported as separate clips?", "a": "Yes — export each frame or a combined video for Reels or Ads." },
        { "q": "Does it support music and voice-over?", "a": "Yes — add music tracks or voice-over files." }
      ],
      "integrations": [
        "Insta Ads Designer",
        "Instagram Admin AI",
        "Reel Ads",
        "Meta Auto Pilot"
      ],
      "cta": "Explore App"
    },
    {
      "name": "AI Video Presenter",
      "hero": "AI Video Presenter — Create a lifelike AI presenter to deliver your project pitch.",
      "full_description": "AI Video Presenter generates a realistic AI presenter that reads your script and presents your pitch with natural voice, gestures, and teleprompter-style delivery. Output is ready for landing pages, pitch decks, or social ads.",
      "level_of_knowledge_required": "Zero. Provide a script and brand assets; the AI handles the rest.",
      "difference_vs_native": "Recording a presenter requires studio time or in-person shoots. AI Video Presenter produces consistent, brand-compliant presentations at scale without equipment.",
      "flow": "Provide script or use UGC Script Writer to auto-generate. Choose presenter style and brand kit from Brand Creator. Generate video and edit with AI YouTube Video Editor if needed. Publish on Landing Page Builder or social channels.",
      "chain": "UGC Script Writer → AI Video Presenter → AI YouTube Video Editor",
      "expected_results": "Faster production cycles (minutes vs days), consistent messaging, and improved viewer retention compared to text-only assets. Expect 2x better pitch clarity and higher lead conversion when used on landing pages.",
      "features": [
        "Lifelike presenter models and voice options",
        "Script-to-voice sync and teleprompter timing",
        "Brand kit integration for wardrobe and background",
        "Export ready for social and web"
      ],
      "demo_placeholder": "Presenter selection and generated video preview",
      "use_cases": [
        "Project pitches without on-camera talent",
        "Automated explainer videos for listings",
        "Scalable agent introductions for lead capture"
      ],
      "faqs": [
        { "q": "Is the presenter customizable?", "a": "Yes — voice, appearance, pacing and background are configurable." },
        { "q": "Are generated voices licensed for commercial use?", "a": "Yes — commercial usage rights are included." }
      ],
      "integrations": [
        "UGC Script Writer",
        "Brand Creator",
        "AI YouTube Video Editor",
        "Landing Page Builder"
      ],
      "cta": "Explore App"
    },
    {
      "name": "UGC Script Writer",
      "hero": "UGC Script Writer — Generate authentic, user-generated content style video ad scripts.",
      "full_description": "UGC Script Writer generates short, conversational scripts that mimic authentic user testimonials and casual storytelling — the style proven to improve trust and ad performance on social platforms.",
      "level_of_knowledge_required": "Zero. Input basic prompts (product, pain point, call-to-action) and receive multiple script variants optimized for different hooks.",
      "difference_vs_native": "Writing scripts manually requires creative effort and testing. This tool provides tested UGC structures that align with best-practice hooks and durations for Reels, Stories, and Feed.",
      "flow": "Input product or listing details. Choose tone and target audience. Generate multiple short scripts. Send scripts to Reel Ads or AI Video Presenter for production.",
      "chain": "UGC Script Writer → Reel Ads → Meta Auto Pilot",
      "expected_results": "UGC-style scripts increase perceived authenticity, often improving CTR and CVR by 20–50% versus overly produced ad copy when targeted correctly.",
      "features": [
        "Multiple hook variations",
        "Tone and length presets",
        "Platform-optimized durations",
        "A/B-ready script outputs"
      ],
      "demo_placeholder": "Script generator with variants and tone selector",
      "use_cases": [
        "Agents needing fast, relatable ad scripts",
        "Brands scaling user-story campaigns",
        "Agencies producing high-volume creative testing"
      ],
      "faqs": [
        { "q": "Can I edit scripts?", "a": "Yes — generated scripts are fully editable and exportable." },
        { "q": "Do you localize scripts?", "a": "Yes — pair with Brochure Translator or Market Library for localization." }
      ],
      "integrations": [
        "Reel Ads",
        "AI Video Presenter",
        "Insta Ads Designer",
        "Brochure Translator"
      ],
      "cta": "Explore App"
    },
    {
      "name": "AI YouTube Video Editor",
      "hero": "AI YouTube Video Editor — Edit any video to be YouTube-ready.",
      "full_description": "AI YouTube Video Editor automates editing tasks like trimming silence, creating chapters, generating titles and descriptions, adding optimized thumbnails, and repackaging long-form content into short-form clips.",
      "level_of_knowledge_required": "Low. Basic familiarity with YouTube is helpful, but the editor automates most decisions.",
      "difference_vs_native": "Native editors require manual trimming and optimization. This editor uses platform best-practices to prepare files for higher discoverability and retention.",
      "flow": "Upload raw footage (or AI Video Presenter output). The editor auto-detects highlights, trims, and suggests chapters. Export full video for YouTube and clips for Reels/TikTok. Push metadata to Landing Page Builder and Market Reports.",
      "chain": "AI Video Presenter → AI YouTube Video Editor → Reel Ads",
      "expected_results": "Improved view retention and search performance; repurposed clips boost discovery and bring traffic back to landing pages. Expect improved average view duration and higher impression-to-click rates.",
      "features": [
        "Auto-trim and highlight detection",
        "Chapter and timestamp generation",
        "Thumbnail and metadata suggestions",
        "Short-form clip extraction"
      ],
      "demo_placeholder": "Editor timeline with auto-highlight markers",
      "use_cases": [
        "Content teams repurposing webinars",
        "Agents creating listing walkthroughs",
        "Marketers optimizing long-form content"
      ],
      "faqs": [
        { "q": "Can it detect highlights automatically?", "a": "Yes — it detects speaking intensity, visual changes, and engagement markers." },
        { "q": "Does it add captions?", "a": "Yes — auto-generated captions with editable transcripts." }
      ],
      "integrations": [
        "AI Video Presenter",
        "Reel Ads",
        "Landing Page Builder",
        "Market Reports"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Landing Page Builder",
      "hero": "Landing Page Builder — Launch a high-converting page in minutes.",
      "full_description": "Landing Page Builder creates conversion-optimized landing pages with tested templates, dynamic components (lead forms, price calculators), A/B variants, and one-click publishing. Pages are SEO-ready and integrate with CRM Memory for lead capture.",
      "level_of_knowledge_required": "Zero. Pre-built blocks, templates and a WYSIWYG enable anyone to build a page quickly.",
      "difference_vs_native": "Traditional web builders require design skill or developer time. This tool provides conversion-tested layouts, real estate-specific modules, and instant CRM connectivity.",
      "flow": "Choose template (listing, lead-gen, project). Pull content from Listing Generator or Market Library. Configure forms and CRM mappings to CRM Memory and WhatsApp Manager. Publish and link to campaigns in Meta Auto Pilot.",
      "chain": "Listing Generator → Landing Page Builder → CRM Memory",
      "expected_results": "Pages built here convert 20–60% better than generic landing pages thanks to proven layouts and direct campaign mappings. Expect faster lead capture and improved quality due to CRM sync.",
      "features": [
        "Conversion-focused templates",
        "Dynamic listing & calculator blocks",
        "A/B testing and analytics",
        "One-click publish and tracking"
      ],
      "demo_placeholder": "Template editor with conversion analytics panel",
      "use_cases": [
        "Single-listing pages for agents",
        "Project pre-launch registration pages",
        "Campaign-specific landing pages for marketers"
      ],
      "faqs": [
        { "q": "Can pages be published to my domain?", "a": "Yes — custom domains and subdomains supported." },
        { "q": "Does it support forms and payment?", "a": "Yes — forms map to CRM Memory; payments are supported for deposits or reservations." }
      ],
      "integrations": [
        "Listing Generator",
        "CRM Memory",
        "Meta Auto Pilot",
        "Market Reports"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Automated Rebranding",
      "hero": "Automated Rebranding — Apply your brand identity to any brochure with text-based commands.",
      "full_description": "Automated Rebranding instantly applies brand colors, logos, typographic hierarchy, and tone of voice to brochures, social creatives, and videos using simple text commands or uploaded brand documents.",
      "level_of_knowledge_required": "Zero. Upload brand assets or describe your brand and the tool applies a consistent design system.",
      "difference_vs_native": "Manual rebranding is slow and prone to inconsistency. Automated Rebranding creates consistent, production-ready assets in minutes.",
      "flow": "Upload brand assets or analyze documents with Brand Creator. Provide commands (e.g., 'apply brand to brochure'). Export rebranded files to Brochure Translator, Insta Ads Designer, or Landing Page Builder.",
      "chain": "Brand Creator → Automated Rebranding → Insta Ads Designer",
      "expected_results": "Consistency in brand application reduces manual design errors and speeds time-to-market by 70–90%. Expect better brand recall and professional-looking assets without a designer.",
      "features": [
        "Brand kit application engine",
        "Text-based rebrand commands",
        "Batch rebrand for multiple files",
        "Export in multiple formats"
      ],
      "demo_placeholder": "Before/after brochure rebrand preview",
      "use_cases": [
        "Agencies producing white-label assets",
        "Enterprises ensuring consistent brand materials",
        "Agents customizing brochures per client"
      ],
      "faqs": [
        { "q": "How accurate is automated design?", "a": "Very accurate for brand elements; typography/spacing follow production rules but can be manually tweaked." },
        { "q": "Can I rebrand videos?", "a": "Yes — brand overlays and intros can be applied to video assets." }
      ],
      "integrations": [
        "Brand Creator",
        "Brochure Translator",
        "Insta Ads Designer",
        "Landing Page Builder"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Brochure Translator",
      "hero": "Brochure Translator — Translate any brochure to multiple languages in seconds.",
      "full_description": "Brochure Translator preserves layout while translating text into multiple target languages, adjusting typography and line breaks automatically to keep design integrity intact.",
      "level_of_knowledge_required": "Zero. Upload a brochure PDF or source file and choose target languages.",
      "difference_vs_native": "Manual translation requires design adjustments and time. This tool automates layout-adaptive translations while keeping brand tone consistent.",
      "flow": "Upload brochure or export from Automated Rebranding. Choose target languages and localization tone. Review and export localized PDFs.",
      "chain": "Automated Rebranding → Brochure Translator → Listing Generator",
      "expected_results": "Reduces translation turnaround from days to minutes and preserves layout fidelity, improving multi-market go-to-market speed by orders of magnitude.",
      "features": [
        "Layout-aware translation",
        "Multiple language exports",
        "Tone customization and glossary support",
        "Batch translation"
      ],
      "demo_placeholder": "PDF preview with language toggle and edit mode",
      "use_cases": [
        "Developers producing multilingual brochures",
        "Agencies localizing marketing materials",
        "Sales teams sending client-ready localized PDFs"
      ],
      "faqs": [
        { "q": "Does it preserve fonts?", "a": "Yes — it adapts typography and fallbacks to preserve layout." },
        { "q": "Is localization accurate for real-estate terms?", "a": "Yes — glossary and glossary enforcement ensures domain accuracy." }
      ],
      "integrations": [
        "Automated Rebranding",
        "Landing Page Builder",
        "Listing Generator"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Visual PDF Editor (Deprecated)",
      "hero": "Visual PDF Editor (Deprecated) — A legacy tool for simple PDF edits.",
      "full_description": "Visual PDF Editor is the legacy editor for quick PDF text and image edits. It remains available in read-only or archived mode for legacy assets but is no longer receiving feature updates.",
      "level_of_knowledge_required": "Low. Basic editing skills helpful for minor modifications.",
      "difference_vs_native": "This tool is deprecated in favor of Automated Rebranding and Brochure Translator which offer layout-aware editing and translation.",
      "flow": "Use only for legacy edits. For production workflows, migrate to Automated Rebranding and Brochure Translator.",
      "chain": "Visual PDF Editor (Deprecated) → Automated Rebranding",
      "expected_results": "Suitable for quick, low-risk edits; newer specialized tools provide better results and automation.",
      "features": [
        "Quick text edits",
        "Image replacement",
        "Simple annotations"
      ],
      "demo_placeholder": "Legacy editor screenshot (read-only badge)",
      "use_cases": [
        "Minor legacy document fixes",
        "Accessing archived brochures that require minor edits"
      ],
      "faqs": [
        { "q": "Is this being replaced?", "a": "Yes — use Automated Rebranding and Brochure Translator for modern workflows." },
        { "q": "Will it be removed?", "a": "It is deprecated but retained for legacy access." }
      ],
      "integrations": [
        "Automated Rebranding (recommended replacement)"
      ],
      "cta": "Explore App"
    },
    {
      "name": "PDF EDITOR AI",
      "hero": "PDF EDITOR AI — Edit PDF documents with AI-powered tools.",
      "full_description": "PDF EDITOR AI allows you to edit PDF documents using natural language commands. Change text, swap images, and adjust layouts without needing complex software like Adobe Acrobat.",
      "level_of_knowledge_required": "Zero. Just describe the changes you want to make.",
      "difference_vs_native": "Traditional PDF editors require manual selection and manipulation of elements. PDF EDITOR AI understands your intent and executes the changes for you.",
      "flow": "Upload a PDF, provide a list of instructions, and the AI generates a new, edited PDF.",
      "chain": "Brand Creator → PDF EDITOR AI → Automated Rebranding",
      "expected_results": "Dramatically faster PDF edits, especially for batch changes or complex documents. Ensures brand consistency when used with Brand Creator.",
      "features": [
        "Natural language editing",
        "Text and image replacement",
        "Layout adjustments",
        "Batch processing"
      ],
      "demo_placeholder": "An animation showing a user typing 'change the price to $2.5M' and the PDF updating.",
      "use_cases": [
        "Updating pricing on brochures",
        "Swapping outdated images in a presentation",
        "Correcting typos in a signed document"
      ],
      "faqs": [
        { "q": "Can it edit any PDF?", "a": "It works best with PDFs that have selectable text. Scanned documents or images may have limited editability." },
        { "q": "Are my documents secure?", "a": "Yes, all documents are processed securely and are not used for any other purpose." }
      ],
      "integrations": [
        "Brand Creator",
        "Automated Rebranding",
        "CRM Memory"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Images HQ AI",
      "hero": "Images HQ AI — Generate high-quality, royalty-free images for your listings and ads.",
      "full_description": "Images HQ AI is a powerful text-to-image generator that creates stunning, photorealistic visuals for all your marketing needs. Describe what you want, and the AI brings it to life.",
      "level_of_knowledge_required": "Zero. If you can describe it, you can create it.",
      "difference_vs_native": "Stock photo sites offer limited, generic options. Images HQ AI provides unique, custom-tailored images that perfectly match your brand and listing.",
      "flow": "Write a descriptive prompt (e.g., 'A modern living room with a view of the Dubai skyline at sunset'). The AI generates image options. Select and download the one you like.",
      "chain": "Images HQ AI → Insta Ads Designer → Landing Page Builder",
      "expected_results": "Unique, eye-catching visuals that increase engagement and make your listings stand out. Eliminates the cost and hassle of stock photography.",
      "features": [
        "Text-to-image generation",
        "Multiple art styles (photorealistic, illustrative, etc.)",
        "High-resolution downloads",
        "Royalty-free commercial use"
      ],
      "demo_placeholder": "A carousel showing a text prompt and the various images generated from it.",
      "use_cases": [
        "Creating hero images for landing pages",
        "Generating lifestyle shots for social media ads",
        "Visualizing a property before it's built"
      ],
      "faqs": [
        { "q": "Are the images truly royalty-free?", "a": "Yes, you have full commercial rights to use the images you generate." },
        { "q": "How specific can my prompts be?", "a": "The more specific, the better! You can describe lighting, colors, camera angles, and more." }
      ],
      "integrations": [
        "Insta Ads Designer",
        "Landing Page Builder",
        "Reel Ads"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Logo Creator AI",
      "hero": "Logo Creator AI — Create a professional logo for your brand in seconds.",
      "full_description": "Logo Creator AI is a rapid logo generation tool. Simply describe your company and your desired style, and the AI will produce a variety of unique, professional logos for you to choose from.",
      "level_of_knowledge_required": "Zero. No design skills needed.",
      "difference_vs_native": "Hiring a designer is expensive and time-consuming. Logo Creator AI delivers professional results instantly, at a fraction of the cost.",
      "flow": "Enter your company name, industry, and style preferences (e.g., 'modern, minimalist, luxury'). The AI generates logos. Pick your favorite and download it.",
      "chain": "Logo Creator AI → Brand Creator → Automated Rebranding",
      "expected_results": "A professional and unique logo that establishes your brand identity. Saves significant time and money compared to traditional design processes.",
      "features": [
        "AI-powered logo design",
        "Multiple style options",
        "Vector and raster file downloads",
        "Full ownership of your design"
      ],
      "demo_placeholder": "An animation showing a user entering 'Luxe Realty' and a grid of professional logos appearing.",
      "use_cases": [
        "New real estate agencies needing a brand identity",
        "Individual agents creating a personal brand",
        "Developers launching a new project with its own logo"
      ],
      "faqs": [
        { "q": "Can I get the logo in different file formats?", "a": "Yes, you can download your logo in formats suitable for web and print, including SVG, PNG, and JPG." },
        { "q": "Can I make changes to the generated logos?", "a": "Yes, you can refine colors, fonts, and layouts before finalizing your design." }
      ],
      "integrations": [
        "Brand Creator",
        "Automated Rebranding",
        "Landing Page Builder"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Aerial View Generator",
      "hero": "Aerial View Generator — Create cinematic, aerial video tours of any property.",
      "full_description": "Aerial View Generator synthesizes cinematic aerial video sequences for properties using available imagery, 3D models, or drone footage. It produces smooth flights, flyovers, and dynamic reveal shots ideal for listing videos and promotional content.",
      "level_of_knowledge_required": "Low. Provide source imagery or select a template; advanced editing is optional.",
      "difference_vs_native": "Hiring drone operators is expensive and requires scheduling. This app generates high-quality aerial sequences quickly and consistently for marketing use.",
      "flow": "Upload asset(s) or select property coordinates. Choose shot sequence (approach, orbit, reveal). Add music and titles. Export to Landing Page Builder, AI YouTube Video Editor, or Reel Ads.",
      "chain": "Listing Generator → Aerial View Generator → AI YouTube Video Editor",
      "expected_results": "High-impact visual content that improves listing engagement and time-on-page. Expect higher click-throughs on listings and better perceived listing quality.",
      "features": [
        "Cinematic flight presets",
        "Auto-stabilization and color grading",
        "Map-based coordinate capture",
        "Export for multiple platforms"
      ],
      "demo_placeholder": "Aerial flight path editor with preview",
      "use_cases": [
        "Property listings with dramatic visuals",
        "Developers showcasing master plans",
        "Virtual tours for marketing collateral"
      ],
      "faqs": [
        { "q": "Do I need drone footage?", "a": "You can upload drone footage, 3D models or rely on AI-synthesized aerials from imagery." },
        { "q": "Is geolocation supported?", "a": "Yes — map-based inputs allow accurate flyovers." }
      ],
      "integrations": [
        "Listing Generator",
        "AI YouTube Video Editor",
        "Landing Page Builder"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Listing Manager",
      "hero": "Listing Manager — Your central hub to prepare and syndicate listings to major portals.",
      "full_description": "Listing Manager standardizes listing data, enriches descriptions, batch-uploads images and videos, and syndicates listings to major portals (Property Finder, Bayut, etc.) with validation checks to ensure compliance.",
      "level_of_knowledge_required": "Low. The tool guides you through required fields and validates common portal errors automatically.",
      "difference_vs_native": "Portal dashboards require manual submission per listing. Listing Manager centralizes preparation and syndication across portals, saving time and reducing errors.",
      "flow": "Draft listing with Listing Generator or import from CRM Memory. Enrich with media from Aerial View Generator and Insta Ads Designer. Validate fields and publish to Property Finder, Bayut via Property Finder Pilot / Bayut Pilot. Track distribution with Listing Performance.",
      "chain": "Listing Generator → Listing Manager → Property Finder Pilot",
      "expected_results": "Reduced publishing time by up to 80% and fewer portal rejections. Higher-quality listings lead to increased views and faster inquiries.",
      "features": [
        "Unified listing editor",
        "Batch-syndication to portals",
        "Field validation and compliance checks",
        "Media management and tagging"
      ],
      "demo_placeholder": "Listing editor with portal destination toggles",
      "use_cases": [
        "Agencies managing multi-portal syndication",
        "Developers listing large project inventories",
        "Agents preparing polished listings quickly"
      ],
      "faqs": [
        { "q": "Which portals are supported?", "a": "Property Finder, Bayut, and other major regional portals via dedicated pilots." },
        { "q": "Can I schedule listing publication?", "a": "Yes — schedule across portals with time-zone controls." }
      ],
      "integrations": [
        "Listing Generator",
        "Aerial View Generator",
        "Property Finder Pilot",
        "Bayut Pilot",
        "Listing Performance"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Listing Performance",
      "hero": "Listing Performance — Track listing views and performance.",
      "full_description": "Listing Performance consolidates analytics across all listings and portals, showing views, inquiries, conversion funnel metrics, and attribution to marketing campaigns.",
      "level_of_knowledge_required": "Low. Metrics are explained in plain language with recommended actions.",
      "difference_vs_native": "Portal analytics are siloed. Listing Performance provides cross-portal comparatives, trend analysis, and campaign attribution to optimize listing exposure.",
      "flow": "Pull metrics from portals and campaigns. Map inquiries to CRM Memory. Surface optimization suggestions (title tweaks, price signals).",
      "chain": "Listing Manager → Meta Auto Pilot → CRM Memory",
      "expected_results": "Faster identification of underperforming listings and actionable optimization suggestions; improves click-to-inquiry rates and shortens time-to-offer.",
      "features": [
        "Cross-portal analytics dashboard",
        "Attribution to campaigns",
        "Actionable optimization recommendations",
        "Historical trend comparisons"
      ],
      "demo_placeholder": "Performance dashboard with portal filters",
      "use_cases": [
        "Portfolio managers tracking multiple listings",
        "Agents optimizing individual listing performance",
        "Developers tracking project-level KPIs"
      ],
      "faqs": [
        { "q": "Can I export reports?", "a": "Yes — export PDF or CSV reports for stakeholders." },
        { "q": "Does it track inquiries back to campaigns?", "a": "Yes — CRO and attribution mapping available via CRM Memory integrations." }
      ],
      "integrations": [
        "Listing Manager",
        "Property Finder Pilot",
        "Bayut Pilot",
        "CRM Memory",
        "Market Reports"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Listing Generator",
      "hero": "Listing Generator — Craft perfect listings for portals like Property Finder & Bayut.",
      "full_description": "Listing Generator produces high-quality listing copy, structured specifications, and media recommendations optimized for major portals. It enforces portal-specific rules and suggests SEO-friendly headlines.",
      "level_of_knowledge_required": "Zero. Provide property details and photos, the tool generates a portal-optimized listing.",
      "difference_vs_native": "Writing effective listing copy manually is time-consuming. This tool automates copy generation and enforces portal constraints to reduce rejections and boost exposure.",
      "flow": "Input property data or import from CRM Memory. Generate descriptions and optimized titles. Export to Listing Manager and Landing Page Builder.",
      "chain": "CRM Memory → Listing Generator → Listing Manager",
      "expected_results": "Higher-quality listings that attract more views and inquiries; expect improved search ranking on portals and faster lead rates.",
      "features": [
        "Portal-specific templates",
        "SEO-optimized headlines",
        "Auto-suggested media set",
        "Compliance checks"
      ],
      "demo_placeholder": "Generated listing preview with optimization score",
      "use_cases": [
        "Agents drafting listings quickly",
        "Developers generating mass listing content",
        "Marketing teams standardizing listing copy"
      ],
      "faqs": [
        { "q": "Can I customize the tone?", "a": "Yes — choose formal, conversational, or luxury tones." },
        { "q": "Does it follow portal rules?", "a": "Yes — it enforces field limits and required formats." }
      ],
      "integrations": [
        "CRM Memory",
        "Listing Manager",
        "Landing Page Builder",
        "Aerial View Generator"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Property Finder Pilot",
      "hero": "Property Finder Pilot — The execution terminal for pushing listings to Property Finder.",
      "full_description": "Property Finder Pilot automates validated uploads, handles API mapping, and manages listing lifecycle events (publish, update, expire) directly with Property Finder while providing error-handling and logging.",
      "level_of_knowledge_required": "Low. The pilot handles API complexity; users manage listing approval and scheduling.",
      "difference_vs_native": "Instead of manual portal uploads, this app automates the entire submission and lifecycle process with robust validation to avoid rejections.",
      "flow": "Prepare listing in Listing Manager. Validate fields and media. Publish via Property Finder Pilot and monitor with Listing Performance.",
      "chain": "Listing Manager → Property Finder Pilot → Listing Performance",
      "expected_results": "Faster publishing and fewer errors; reduces manual portal handling time dramatically and keeps listings live and updated reliably.",
      "features": [
        "API-based publishing",
        "Validation and error handling",
        "Lifecycle management",
        "Publishing logs and rollbacks"
      ],
      "demo_placeholder": "Publishing log with success and error indicators",
      "use_cases": [
        "Agencies automating portal publishing",
        "Developers with large inventories",
        "Operations teams ensuring compliance"
      ],
      "faqs": [
        { "q": "Does it require credentials?", "a": "Secure API keys are required; the pilot handles mapping." },
        { "q": "Can it auto-update prices?", "a": "Yes — scheduled or triggered updates are supported." }
      ],
      "integrations": [
        "Listing Manager",
        "Listing Performance",
        "CRM Memory"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Bayut Pilot",
      "hero": "Bayut Pilot — The execution terminal for pushing listings to Bayut.",
      "full_description": "Bayut Pilot provides the same automated publishing, validation, and lifecycle management for Bayut portal as Property Finder Pilot does for Property Finder.",
      "level_of_knowledge_required": "Low. Designed to hide API complexity while providing publishing transparency.",
      "difference_vs_native": "Automates Bayut-specific publishing rules and saves substantial manual effort compared to portal UIs.",
      "flow": "Draft in Listing Manager. Validate and publish via Bayut Pilot. Monitor with Listing Performance.",
      "chain": "Listing Manager → Bayut Pilot → Listing Performance",
      "expected_results": "Reduced publishing errors and faster time-to-live for listings. Increases portal visibility and reduces operational workload.",
      "features": [
        "Bayut API publishing",
        "Field validations",
        "Automated updates and rollback",
        "Publishing audit logs"
      ],
      "demo_placeholder": "Bayut publishing dashboard with validation panel",
      "use_cases": [
        "Single agents publishing to Bayut",
        "Agencies managing Bayut inventory",
        "Operations teams automating portal rules"
      ],
      "faqs": [
        { "q": "Are all Bayut fields supported?", "a": "Yes — the pilot maps all common fields and flags unsupported ones." },
        { "q": "Can it manage auto-expiry?", "a": "Yes, scheduling and auto-expiry are supported." }
      ],
      "integrations": [
        "Listing Manager",
        "Listing Performance",
        "CRM Memory"
      ],
      "cta": "Explore App"
    },
    {
      "name": "AI Price Estimator",
      "hero": "AI Price Estimator — Get an AI-powered price estimate for any property.",
      "full_description": "AI Price Estimator analyzes comparable sales, market trends, property attributes, and live feed data to produce an explainable price estimate with confidence intervals and factors affecting valuation.",
      "level_of_knowledge_required": "Zero. Input basic property details and receive a transparent valuation breakdown.",
      "difference_vs_native": "Manual valuation requires local expertise and time. This tool provides instant, data-backed estimates with reasoning and comparable references.",
      "flow": "Input property details or pull from Listing Generator. Review estimate and contributing factors. Push suggested price to Listing Generator and Landing Page Builder or use in Payment Planner and Investor Matching.",
      "chain": "Listing Generator → AI Price Estimator → Payment Planner",
      "expected_results": "Faster pricing decisions with confidence intervals; reduces overpricing and underpricing mistakes, improving time-to-offer.",
      "features": [
        "Comparable analysis",
        "Confidence intervals and factor breakdown",
        "Market trend overlay",
        "Exportable valuation reports"
      ],
      "demo_placeholder": "Valuation dashboard showing comparables and confidence band",
      "use_cases": [
        "Agents providing instant price guidance",
        "Buyers assessing offer ranges",
        "Developers pricing units in phases"
      ],
      "faqs": [
        { "q": "Is the estimate legally binding?", "a": "No — it's a data-driven estimate for guidance; final pricing depends on inspection and agreements." },
        { "q": "Does it use live market data?", "a": "Yes — market feeds and Market Library supplement the model." }
      ],
      "integrations": [
        "Listing Generator",
        "Market Library",
        "Payment Planner",
        "Listing Manager"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Commission Calculator",
      "hero": "Commission Calculator — Instantly calculate your sales commission.",
      "full_description": "Commission Calculator computes commissions across tiered structures, co-broker splits, incentives, and tax rules. It provides downloadable breakdowns for transparent settlements.",
      "level_of_knowledge_required": "Zero. Enter sale price and commission rules; the tool handles the rest.",
      "difference_vs_native": "Manual calculations are error-prone. This app standardizes commission logic, reducing accounting disputes.",
      "flow": "Input sale price and applicable commission rules. Generate split scenarios and export settlement statements. Sync with CRM Memory and Payment Planner.",
      "chain": "CRM Memory → Commission Calculator → Payment Planner",
      "expected_results": "Faster settlements and fewer disputes — team productivity increases and accounting accuracy improves significantly.",
      "features": [
        "Tiered commission logic",
        "Co-broker splits and overrides",
        "Exportable settlement statements",
        "Tax and fee adjustments"
      ],
      "demo_placeholder": "Commission breakdown with split scenarios",
      "use_cases": [
        "Sales teams calculating payouts",
        "Agencies automating settlements",
        "Accounting teams validating commissions"
      ],
      "faqs": [
        { "q": "Can I set custom commission tiers?", "a": "Yes — create and save custom commission schemes." },
        { "q": "Does it handle cross-border taxes?", "a": "It supports local tax rules; consult your tax advisor for compliance." }
      ],
      "integrations": [
        "CRM Memory",
        "Payment Planner",
        "Listing Manager"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Payment Planner",
      "hero": "Payment Planner — Generate tailored payment plans for off-plan properties.",
      "full_description": "Payment Planner creates schedule-driven payment plans, calculates installments, milestone payments, and produces client-facing schedules with legal-friendly formatting.",
      "level_of_knowledge_required": "Low. Basic knowledge of sales terms is helpful but templates handle common scenarios.",
      "difference_vs_native": "Manual payment schedules require spreadsheets and legal reviews. Payment Planner automates plans and generates client-ready documents.",
      "flow": "Input price, down payment and milestone rules. Generate schedule and client documents. Integrate with CRM Memory and Payment collection workflows.",
      "chain": "AI Price Estimator → Payment Planner → CRM Memory",
      "expected_results": "Faster negotiation cycles and clearer client expectations; reduces errors in payment scheduling and reporting.",
      "features": [
        "Milestone-driven scheduling",
        "Installment calculations",
        "Client-facing PDFs",
        "Integration with payment gateways"
      ],
      "demo_placeholder": "Payment timeline with milestone edits",
      "use_cases": [
        "Developers creating buyer schedules",
        "Sales teams offering flexible payment options",
        "Clients reviewing payment terms clearly"
      ],
      "faqs": [
        { "q": "Can I adjust milestones after generation?", "a": "Yes — schedules are editable and re-exportable." },
        { "q": "Are payment reminders supported?", "a": "Yes — reminders integrate with WhatsApp Manager." }
      ],
      "integrations": [
        "AI Price Estimator",
        "CRM Memory",
        "WhatsApp Manager"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Investor Matching",
      "hero": "Investor Matching — Pair budgets with the right projects.",
      "full_description": "Investor Matching uses investor profiles, budgets, preferences, and project parameters to match investors with suitable developments or listings, prioritizing fit and return profiles.",
      "level_of_knowledge_required": "Low. Profiles and preferences can be managed by sales teams or investors themselves.",
      "difference_vs_native": "Manual matchmaking is slow. Automated matching surfaces high-probability fits and accelerates introductions.",
      "flow": "Create investor profiles in CRM Memory. Feed project inventory from Listing Manager. Run match algorithms and create introduction lists.",
      "chain": "CRM Memory → Listing Manager → Investor Matching",
      "expected_results": "Faster investor conversions and better fit; increases qualified introductions and shortens deal cycles.",
      "features": [
        "Profile-based matching algorithm",
        "Budget & preference filters",
        "Match confidence scoring",
        "Exportable introductions list"
      ],
      "demo_placeholder": "Match result list with confidence scoring",
      "use_cases": [
        "Developers seeking strategic investors",
        "Investment teams matching portfolios",
        "Agents creating investor pipelines"
      ],
      "faqs": [
        { "q": "How private is investor data?", "a": "Investor data is encrypted and access-controlled." },
        { "q": "Can matches be scheduled automatically?", "a": "Yes — automated outreach workflows can be configured." }
      ],
      "integrations": [
        "CRM Memory",
        "Listing Manager",
        "Multi-Offer Builder"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Multi-Offer Builder",
      "hero": "Multi-Offer Builder — Compare property options side-by-side for clients.",
      "full_description": "Multi-Offer Builder creates side-by-side comparisons of properties, financing options, payment plans, and projected returns, enabling clients to evaluate choices visually and quantitatively.",
      "level_of_knowledge_required": "Low. The tool presents easy comparison views and suggested recommendations.",
      "difference_vs_native": "Manual comparison using spreadsheets is time-consuming. This tool automates comparison creation and produces client-ready exportables.",
      "flow": "Select properties from Listing Manager. Add payment plans from Payment Planner and price estimates from AI Price Estimator. Generate comparison PDFs and interactive pages via Landing Page Builder.",
      "chain": "Listing Manager → AI Price Estimator → Multi-Offer Builder",
      "expected_results": "Improved client decision speed and clarity; reduces negotiation time and increases conversion rates.",
      "features": [
        "Side-by-side financial comparisons",
        "Projected ROI and rental yield calculators",
        "Exportable interactive PDFs",
        "Client recommendation notes"
      ],
      "demo_placeholder": "Comparison grid with selectable criteria",
      "use_cases": [
        "Advisors presenting multiple investment options",
        "Sales teams shortening decision cycles",
        "Clients comparing affordability vs ROI"
      ],
      "faqs": [
        { "q": "Can I share interactive comparisons?", "a": "Yes — shareable landing pages or PDFs are available." },
        { "q": "Does it include financing scenarios?", "a": "Yes — includes mortgage or payment plan scenarios." }
      ],
      "integrations": [
        "Listing Manager",
        "AI Price Estimator",
        "Payment Planner",
        "Landing Page Builder"
      ],
      "cta": "Explore App"
    },
    {
      "name": "WhatsApp Manager",
      "hero": "WhatsApp Manager — Send personalized broadcasts and drip campaigns.",
      "full_description": "WhatsApp Manager enables compliant, personalized messaging, automated drip sequences, and CRM-triggered follow-ups with templates, scheduling, and delivery tracking.",
      "level_of_knowledge_required": "Low. Templates and flows make campaign creation straightforward.",
      "difference_vs_native": "Manual broadcasting is laborious and error-prone. This manager automates personalization at scale and ties messages to campaign attribution.",
      "flow": "Create audience or import from CRM Memory. Select templates or craft messages. Schedule broadcasts or set drip triggers based on CRM events.",
      "chain": "CRM Memory → WhatsApp Manager → Meta Auto Pilot",
      "expected_results": "Higher lead engagement and conversion; automated follow-ups reduce lead drop-off and increase contact rates significantly.",
      "features": [
        "Personalized broadcast templates",
        "Drip campaign builder",
        "Delivery and read receipts",
        "Compliance and opt-out management"
      ],
      "demo_placeholder": "Campaign flow builder with personalization tokens",
      "use_cases": [
        "Follow-up sequences for inbound leads",
        "Broadcasts for new listings or open houses",
        "Transactional messages and reminders"
      ],
      "faqs": [
        { "q": "Is WhatsApp Business API supported?", "a": "Yes — uses WhatsApp Business API with compliance features." },
        { "q": "Can messages be personalized?", "a": "Yes — tokens and CRM fields enable deep personalization." }
      ],
      "integrations": [
        "CRM Memory",
        "Landing Page Builder",
        "Meta Auto Pilot"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Lead Investigator AI",
      "hero": "Lead Investigator AI — Find social profiles and professional history for any lead.",
      "full_description": "Lead Investigator AI enriches leads with public social profiles, professional history, and inferred intent signals to give sales teams deeper context before outreach.",
      "level_of_knowledge_required": "Zero. Enter a lead identifier and receive an enrichment profile.",
      "difference_vs_native": "Manual research is slow. This tool automates enrichment, providing quick background checks and contact context.",
      "flow": "Input lead or import from CRM Memory. Run enrichment to append profiles and scoring. Route enriched leads to sales workflows or WhatsApp Manager.",
      "chain": "CRM Memory → Lead Investigator AI → WhatsApp Manager",
      "expected_results": "Faster qualification and personalized outreach; increases response rates and reduces wasted outreach time.",
      "features": [
        "Profile enrichment",
        "Intent scoring and lead priority",
        "Source evidence & links",
        "Exportable lead dossiers"
      ],
      "demo_placeholder": "Lead dossier with social snippets and score",
      "use_cases": [
        "Brokers qualifying inbound leads",
        "Agencies preparing personalized pitches",
        "Sales teams prioritizing outreach"
      ],
      "faqs": [
        { "q": "Is this compliant with privacy rules?", "a": "Only public data is used; always follow local data protection laws." },
        { "q": "Can enrichment be automated?", "a": "Yes — enable scheduled enrichment for incoming leads." }
      ],
      "integrations": [
        "CRM Memory",
        "WhatsApp Manager",
        "Market Library"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Market Library",
      "hero": "Market Library — Search our intelligent library for verified projects.",
      "full_description": "Market Library is a verified repository of projects, historical pricing, and developer data. Searchable by coordinates, developer, project stage, or price band with trust signals.",
      "level_of_knowledge_required": "Low. Search and filters are intuitive and return contextualized results.",
      "difference_vs_native": "Scattered market data requires manual consolidation. Market Library centralizes verified project data and embeds trust signals for decision-making.",
      "flow": "Search or browse projects. Pull data into Market Reports or AI Price Estimator. Use verified details in Listing Generator or Investor Matching.",
      "chain": "Market Library → AI Price Estimator → Market Reports",
      "expected_results": "Faster research cycles and more confident pricing and positioning decisions; reduces time spent validating developer claims.",
      "features": [
        "Verified project database",
        "Search by multiple parameters",
        "Developer trust scores",
        "Exportable data packs"
      ],
      "demo_placeholder": "Project detail page with verification badges",
      "use_cases": [
        "Analysts validating projects",
        "Agents referencing verified specs",
        "Developers benchmarking competition"
      ],
      "faqs": [
        { "q": "How is data verified?", "a": "Multiple sources and direct developer feeds where available; trust signals are shown per record." },
        { "q": "Can I request additions?", "a": "Yes — submit projects for verification." }
      ],
      "integrations": [
        "AI Price Estimator",
        "Market Reports",
        "Listing Generator"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Market Reports",
      "hero": "Market Reports — Generate PDF reports on market trends, pricing, and sentiment.",
      "full_description": "Market Reports creates exportable, branded PDF reports on market health, price movement, sentiment, and portfolio performance with charts and contextual narratives.",
      "level_of_knowledge_required": "Low. Choose pre-built templates or customize sections and data sources.",
      "difference_vs_native": "Manual reporting is slow and inconsistent. Market Reports automates report generation and embeds analytics from the Market Library and Listing Performance.",
      "flow": "Select region, timeframe and data sources. Customize narrative sections and visuals. Export PDF and distribute via CRM Memory workflows.",
      "chain": "Market Library → Listing Performance → Market Reports",
      "expected_results": "Faster stakeholder reporting and clearer market insights for decision making. Cuts reporting time by 80% while improving clarity.",
      "features": [
        "Branded PDF exports",
        "Customizable data sections",
        "Charts and narrative generation",
        "Automated distribution"
      ],
      "demo_placeholder": "Report builder with drag-drop sections and export button",
      "use_cases": [
        "Development teams producing investor updates",
        "Agencies delivering market insights to clients",
        "Internal strategy reports for leadership"
      ],
      "faqs": [
        { "q": "Can reports be scheduled?", "a": "Yes — automate weekly or monthly distributions." },
        { "q": "Can I include custom data?", "a": "Yes — import CSV or link to Listing Performance." }
      ],
      "integrations": [
        "Market Library",
        "Listing Performance",
        "CRM Memory"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Market Trends Watcher",
      "hero": "Market Trends Watcher — Identify emerging market trends before they become mainstream.",
      "full_description": "Market Trends Watcher continuously monitors price movement, listing velocity, sentiment, and search behavior to surface early signals and alerts for emerging trends or cooling markets.",
      "level_of_knowledge_required": "Low. Alerts and dashboards are presented with pragmatic advice.",
      "difference_vs_native": "Manual trend spotting is retrospective. This tool provides early warnings and actionable triggers to adjust marketing or pricing strategy proactively.",
      "flow": "Configure regions and alert thresholds. Receive periodic insights and alerts. Feed signals into Campaign Builder, AI Price Estimator, or Market Reports.",
      "chain": "Market Trends Watcher → AI Price Estimator → Market Reports",
      "expected_results": "Earlier response to market shifts enabling better pricing and marketing decisions; reduces time-to-adjust and mitigates inventory stagnation.",
      "features": [
        "Real-time trend monitoring",
        "Custom alerts and thresholds",
        "Sentiment and search-volume signals",
        "Actionable recommendations"
      ],
      "demo_placeholder": "Trend alert feed with heatmap visualization",
      "use_cases": [
        "Portfolio managers adjusting pricing",
        "Marketers aligning campaigns to demand",
        "Developers timing launch phases"
      ],
      "faqs": [
        { "q": "How often are signals updated?", "a": "Continuous; alerts are pushed when thresholds are crossed." },
        { "q": "Can I customize alert sensitivity?", "a": "Yes — adjust sensitivity per region or asset class." }
      ],
      "integrations": [
        "Market Library",
        "Market Reports",
        "AI Price Estimator"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Brand Creator",
      "hero": "Brand Creator — Configure your entire brand kit by analyzing uploaded documents.",
      "full_description": "Brand Creator analyzes uploaded documents, logos, and tone of voice to produce a full brand kit including palettes, typography, logo usage rules, and writing tone guidelines.",
      "level_of_knowledge_required": "Zero. Upload brand assets or raw documents and receive a complete brand kit.",
      "difference_vs_native": "Manual brand creation requires designers and brand strategists. This tool rapidly produces a usable brand kit with guidelines for the rest of the suite to use.",
      "flow": "Upload brand files or documents. Generate brand kit and usage rules. Apply kit across Automated Rebranding, Insta Ads Designer, and Landing Page Builder.",
      "chain": "Brand Creator → Automated Rebranding → Insta Ads Designer",
      "expected_results": "Faster brand enablement and consistent application across assets; reduces rework and preserves brand integrity across campaigns.",
      "features": [
        "Auto-extracted palettes and fonts",
        "Logo usage rules and spacing",
        "Tone-of-voice guidelines",
        "Exportable brand kit package"
      ],
      "demo_placeholder": "Brand kit preview with color swatches and typography",
      "use_cases": [
        "New brands launching fast",
        "Agencies producing white-label assets",
        "Enterprises standardizing brand application"
      ],
      "faqs": [
        { "q": "Does it produce vector logos?", "a": "It extracts logo variants and provides guidance; original vector files are recommended for best fidelity." },
        { "q": "Can I edit the generated kit?", "a": "Yes — all fields are editable." }
      ],
      "integrations": [
        "Automated Rebranding",
        "Insta Ads Designer",
        "Landing Page Builder"
      ],
      "cta": "Explore App"
    },
    {
      "name": "CRM Memory",
      "hero": "CRM Memory — The core data store that remembers every client interaction.",
      "full_description": "CRM Memory stores lead and client data, interaction history, deal stages, documents, and AI-annotated notes. It acts as the single source of truth for customer lifecycle and feeds other suite apps with contextual data.",
      "level_of_knowledge_required": "Low. Basic CRM concepts apply; onboarding templates simplify setup.",
      "difference_vs_native": "Unlike generic CRMs, CRM Memory is deeply integrated with the suite to supply enriched audiences, match investors, and power automated flows.",
      "flow": "Ingest leads from campaigns and listing inquiries. Enrich with Lead Investigator AI and Market Library context. Drive automations in WhatsApp Manager and Meta Auto Pilot.",
      "chain": "Meta Auto Pilot → CRM Memory → WhatsApp Manager",
      "expected_results": "Cleaner data, better lead follow-up, and measurable increases in conversion due to context-rich interactions; reduces lead leakage and improves attribution.",
      "features": [
        "Full interaction timeline",
        "AI annotations and scoring",
        "Segment and lifecycle management",
        "Secure export and permissions"
      ],
      "demo_placeholder": "Lead profile with timeline and AI-notes",
      "use_cases": [
        "Sales teams centralizing client records",
        "Marketers using enriched data for targeting",
        "Operations ensuring audit and compliance"
      ],
      "faqs": [
        { "q": "Can I import existing CRM data?", "a": "Yes — bulk import and field mapping tools are provided." },
        { "q": "Is data encrypted?", "a": "Yes — enterprise-grade encryption and access controls are used." }
      ],
      "integrations": [
        "Meta Auto Pilot",
        "Audience Creator",
        "WhatsApp Manager",
        "Listing Manager"
      ],
      "cta": "Explore App"
    },
    {
      "name": "AI Assistant",
      "hero": "Assistant — Your personal, trainable AI partner.",
      "full_description": "Assistant is a trainable AI that learns from your CRM Memory, Market Library, and usage patterns to provide contextually-aware assistance: drafting messages, creating briefs, suggesting optimizations, and answering queries about your inventory and market.",
      "level_of_knowledge_required": "Zero. Interact in natural language; the assistant learns and improves over time.",
      "difference_vs_native": "Generic chatbots lack domain memory. Assistant uses suite context to provide accurate, actionable responses tied to real data.",
      "flow": "Grant read permissions to CRM Memory and Market Library (opt-in). Ask natural language questions or request workflows. Assistant executes or generates content, which can be pushed to other apps.",
      "chain": "CRM Memory → AI Assistant → Campaign Builder",
      "expected_results": "Faster content generation, fewer back-and-forths, and more consistent operational decisions; reduces routine task time by up to 60–80%.",
      "features": [
        "Trainable on your data",
        "Actionable recommendations",
        "Draft generation and execution",
        "Context-aware answers"
      ],
      "demo_placeholder": "Assistant chat with suggested actions and execution buttons",
      "use_cases": [
        "Drafting email and WhatsApp sequences",
        "Generating campaign briefs",
        "Answering market questions with live data"
      ],
      "faqs": [
        { "q": "Can I control data access?", "a": "Yes — granular permission and opt-in controls are available." },
        { "q": "Can it perform actions?", "a": "It can prepare actions for approval or execute them if permissions are granted." }
      ],
      "integrations": [
        "CRM Memory",
        "Market Library",
        "Campaign Builder",
        "Landing Page Builder"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Embeddable Site Assistant",
      "hero": "Embeddable Site Assistant — Add a market-aware AI chatbot to any website.",
      "full_description": "Embeddable Site Assistant is a lightweight chatbot that pulls market and listing data to answer visitor questions, capture leads, and recommend listings directly on any site.",
      "level_of_knowledge_required": "Zero. Copy-paste embed script and configure data sources.",
      "difference_vs_native": "Generic chat widgets respond generically. This assistant uses Market Library, Listing Manager and CRM Memory to provide accurate, commerce-ready answers.",
      "flow": "Install embed script on website. Configure data sources and intents. Capture leads into CRM Memory and hand off to WhatsApp Manager as needed.",
      "chain": "Listing Manager → Embeddable Site Assistant → CRM Memory",
      "expected_results": "Higher on-site engagement and more qualified lead captures; reduces bounce and increases conversion on landing pages.",
      "features": [
        "Easy embed script",
        "Context-aware responses using suite data",
        "Lead capture & routing",
        "Customizable UI"
      ],
      "demo_placeholder": "Chat widget preview with example flows",
      "use_cases": [
        "On-site lead capture for listings",
        "Customer support for project inquiries",
        "Interactive market info on developer sites"
      ],
      "faqs": [
        { "q": "Is the widget customizable?", "a": "Yes — style and behavior can be customized." },
        { "q": "Does it store data in CRM?", "a": "Yes — leads flow to CRM Memory." }
      ],
      "integrations": [
        "CRM Memory",
        "Listing Manager",
        "Market Library",
        "WhatsApp Manager"
      ],
      "cta": "Explore App"
    },
    {
      "name": "VM Creator",
      "hero": "VM Creator — A utility for developers to provision Google Cloud virtual machines.",
      "full_description": "VM Creator simplifies provisioning repeatable Google Cloud VMs with security best-practices, preinstalled runtime stacks, and infrastructure as code templates for developers and ops.",
      "level_of_knowledge_required": "Medium. Basic cloud or devops familiarity recommended for advanced configurations; presets make common setups trivial.",
      "difference_vs_native": "Manually provisioning cloud VMs is error-prone. VM Creator automates secure, repeatable provisioning and environment setup.",
      "flow": "Choose preset (web app, worker, data pipeline). Configure sizing and network. Provision VM with startup scripts and monitoring.",
      "chain": "VM Creator → Creative Execution Terminal → AI YouTube Video Editor",
      "expected_results": "Faster environment provisioning and consistent developer environments which reduce configuration drift and deployment errors.",
      "features": [
        "Preset stacks and scripts",
        "Secure defaults and firewall rules",
        "SSH and monitoring setup",
        "Infrastructure as code exports"
      ],
      "demo_placeholder": "Provision wizard with cost estimate",
      "use_cases": [
        "Developers provisioning test or production VMs",
        "Ops teams automating environment creation",
        "Creative tasks requiring dedicated compute"
      ],
      "faqs": [
        { "q": "Which cloud is supported?", "a": "Google Cloud with exported IaC templates." },
        { "q": "Does it estimate cost?", "a": "Yes — cost estimates are shown prior to provisioning." }
      ],
      "integrations": [
        "Creative Execution Terminal"
      ],
      "cta": "Explore App"
    },
    {
      "name": "Creative Execution Terminal",
      "hero": "Creative Execution Terminal — The execution engine for complex creative tasks.",
      "full_description": "Creative Execution Terminal orchestrates complex creative pipelines, batching tasks like video rendering, generative image sets, and large-file transformations using queued workers (VM Creator provisioned as needed).",
      "level_of_knowledge_required": "Medium. Familiarity with creative workflows helps but templates are available for common pipelines.",
      "difference_vs_native": "Local rendering or manual orchestration is slow and inconsistent. This terminal automates and scales creative workloads reliably.",
      "flow": "Define creative pipeline (e.g., generate 50 listing videos). Assign presets and assets from Brand Creator and Aerial View Generator. Execute on provisioned VMs and export to distribution channels.",
      "chain": "VM Creator → Creative Execution Terminal → AI YouTube Video Editor",
      "expected_results": "Reliable large-batch creative production, faster throughput, and consistent output quality across large campaigns.",
      "features": [
        "Queue and worker orchestration",
        "Batch render presets",
        "Asset management and export",
        "Monitoring and retries"
      ],
      "demo_placeholder": "Pipeline dashboard with worker status",
      "use_cases": [
        "Large-scale listing video production",
        "Agency batch creative runs",
        "Developers generating programmatic assets"
      ],
      "faqs": [
        { "q": "Does it auto-scale?", "a": "Yes — workers can scale via VM Creator presets." },
        { "q": "Can I monitor jobs?", "a": "Real-time job monitoring and logs are provided." }
      ],
      "integrations": [
        "VM Creator",
        "AI YouTube Video Editor",
        "Aerial View Generator"
      ],
      "cta": "Explore App"
    }
  ]
}
