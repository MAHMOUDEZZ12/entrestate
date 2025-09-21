
// src/components/diagrams/ExecutiveBrainMap.tsx
// A self-contained, responsive SVG diagram in your brand palette.
// Usage: <ExecutiveBrainMap className="w-full h-auto" />

import React from "react";

type Props = React.SVGProps<SVGSVGElement>;

export default function ExecutiveBrainMap(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-labelledby="title desc" {...props}>
      <title id="title">Super Sales Suite — Executive Brain Map (Light)</title>
      <desc id="desc">High-level architecture showing UI, AI Core, Event Bus, Services, Data, and Background Jobs.</desc>

      {/* Background */}
      <rect x="0" y="0" width="1200" height="800" fill="#FFFFFF"/>

      {/* Header */}
      <text x="600" y="60" textAnchor="middle" fill="#7A7A7A" fontSize="18">
        Super Sales Suite • AI-driven, event-based tools for real estate
      </text>

      {/* UI Layer */}
      <g>
        <rect x="120" y="100" width="960" height="90" rx="18" fill="#F7F7F7" stroke="#7A7A7A" strokeWidth="2"/>
        <text x="600" y="140" textAnchor="middle" fill="#111111" fontSize="20" fontWeight="600">
          User Interface (Next.js • Vercel)
        </text>
        <text x="600" y="165" textAnchor="middle" fill="#7A7A7A" fontSize="14">
          Home • Onboarding (DeepSearch) • Dashboard (Tools) • Assistant Panel
        </text>
      </g>

      {/* Event Bus halo */}
      <circle cx="600" cy="400" r="220" fill="none" stroke="#BBBBBB" strokeDasharray="6 8"/>
      <text x="600" y="225" textAnchor="middle" fill="#7A7A7A" fontSize="12">Event Bus &amp; Orchestration</text>

      {/* AI Core */}
      <g>
        <circle cx="600" cy="400" r="110" fill="#FAFAFA" stroke="#95FE54" strokeWidth="2.5"/>
        <text x="600" y="395" textAnchor="middle" fill="#0D4F0D" fontSize="24" fontWeight="700">AI Core</text>
        <text x="600" y="420" textAnchor="middle" fill="#2F6A2F" fontSize="13">Intent → Plan → Actions → Review</text>
        <text x="600" y="444" textAnchor="middle" fill="#7A7A7A" fontSize="12">(Multi-step Copilot • Text-to-Action Chains)</text>
      </g>

      {/* Services around core */}
      {/* Projects */}
      <g>
        <rect x="330" y="260" width="180" height="70" rx="12" fill="#FAFAFA" stroke="#BBBBBB"/>
        <text x="420" y="300" textAnchor="middle" fill="#111111" fontSize="14" fontWeight="600">Projects Library</text>
        <text x="420" y="318" textAnchor="middle" fill="#7A7A7A" fontSize="11">per market (city/dev focus)</text>
        <line x1="420" y1="330" x2="560" y2="360" stroke="#BBBBBB" strokeWidth="1.5"/>
      </g>

      {/* Brand Kit */}
      <g>
        <rect x="690" y="260" width="180" height="70" rx="12" fill="#FAFAFA" stroke="#BBBBBB"/>
        <text x="780" y="300" textAnchor="middle" fill="#111111" fontSize="14" fontWeight="600">Brand Kit</text>
        <text x="780" y="318" textAnchor="middle" fill="#7A7A7A" fontSize="11">logo • colors • contacts</text>
        <line x1="640" y1="360" x2="780" y2="330" stroke="#BBBBBB" strokeWidth="1.5"/>
      </g>

      {/* Creative Tools */}
      <g>
        <rect x="260" y="470" width="210" height="80" rx="12" fill="#FAFAFA" stroke="#BBBBBB"/>
        <text x="365" y="505" textAnchor="middle" fill="#111111" fontSize="14" fontWeight="600">Creative Tools</text>
        <text x="365" y="525" textAnchor="middle" fill="#7A7A7A" fontSize="11">PDF Rebrand • Social • Reels • Landing</text>
        <line x1="470" y1="500" x2="530" y2="450" stroke="#BBBBBB" strokeWidth="1.5"/>
      </g>

      {/* Ads Manager */}
      <g>
        <rect x="730" y="470" width="210" height="80" rx="12" fill="#FAFAFA" stroke="#BBBBBB"/>
        <text x="835" y="505" textAnchor="middle" fill="#111111" fontSize="14" fontWeight="600">Ads Manager</text>
        <text x="835" y="525" textAnchor="middle" fill="#7A7A7A" fontSize="11">Ad Creator • Precision • Copilots</text>
        <line x1="670" y1="450" x2="730" y2="500" stroke="#BBBBBB" strokeWidth="1.5"/>
      </g>

      {/* Comms & Outreach */}
      <g>
        <rect x="500" y="520" width="200" height="80" rx="12" fill="#FAFAFA" stroke="#BBBBBB"/>
        <text x="600" y="555" textAnchor="middle" fill="#111111" fontSize="14" fontWeight="600">Comms &amp; Outreach</text>
        <text x="600" y="575" textAnchor="middle" fill="#7A7A7A" fontSize="11">Email • WhatsApp • IG Bot</text>
        <line x1="600" y1="510" x2="600" y2="458" stroke="#BBBBBB" strokeWidth="1.5"/>
      </g>

      {/* Data & Jobs */}
      <g>
        <rect x="140" y="650" width="440" height="90" rx="14" fill="#F7F7F7" stroke="#BBBBBB"/>
        <text x="360" y="685" textAnchor="middle" fill="#111111" fontSize="15" fontWeight="600">Data Layer (Firestore • Storage)</text>
        <text x="360" y="706" textAnchor="middle" fill="#7A7A7A" fontSize="12">users • projects_catalog • projects_library • events • drafts</text>

        <rect x="620" y="650" width="440" height="90" rx="14" fill="#F7F7F7" stroke="#BBBBBB"/>
        <text x="840" y="685" textAnchor="middle" fill="#111111" fontSize="15" fontWeight="600">Background Jobs (Cloud Functions)</text>
        <text x="840" y="706" textAnchor="middle" fill="#7A7A7A" fontSize="12">generate library • sync brand • schedule chains • integrations</text>

        <line x1="365" y1="650" x2="365" y2="555" stroke="#BBBBBB" strokeWidth="1"/>
        <line x1="600" y1="650" x2="600" y2="600" stroke="#BBBBBB" strokeWidth="1"/>
        <line x1="835" y1="650" x2="835" y2="555" stroke="#BBBBBB" strokeWidth="1"/>
      </g>

      {/* UI → AI Core arrow */}
      <g stroke="#F64A8B" strokeWidth="2">
        <line x1="600" y1="190" x2="600" y2="280"/>
        <polygon points="600,280 594,268 606,268" fill="#F64A8B"/>
      </g>

      {/* Footer palette */}
      <text x="600" y="780" textAnchor="middle" fill="#7A7A7A" fontSize="12">
        Colors: Lime #95FE54 • Pink #F64A8B • Gray #7A7A7A • Base #FFFFFF
      </text>
    </svg>
  );
}
