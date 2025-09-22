
import React from 'react';

type Props = React.SVGProps<SVGSVGElement>;

export default function ExecutiveBrainMap(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-labelledby="title desc" {...props}>
      <title id="title">Super Sales Suite — Executive Brain Map (Light)</title>
      <desc id="desc">High-level architecture showing UI, AI Core, Event Bus, Services, Data, and Background Jobs.</desc>

      {/* Background */}
      <rect x="0" y="0" width="1200" height="800" fill="hsl(var(--background))"/>

      {/* Header */}
      <text x="600" y="60" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="18">
        Super Sales Suite • AI-driven, event-based tools for real estate
      </text>

      {/* UI Layer */}
      <g>
        <rect x="120" y="100" width="960" height="90" rx="18" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2"/>
        <text x="600" y="140" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="20" fontWeight="600">
          User Interface (Next.js • Vercel)
        </text>
        <text x="600" y="165" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="14">
          Home • Onboarding (DeepSearch) • Dashboard (Tools) • Assistant Panel
        </text>
      </g>

      {/* Event Bus halo */}
      <circle cx="600" cy="400" r="220" fill="none" stroke="hsl(var(--border))" strokeDasharray="6 8"/>
      <text x="600" y="225" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">Event Bus &amp; Orchestration</text>

      {/* AI Core */}
      <g>
        <circle cx="600" cy="400" r="110" fill="hsl(var(--primary-foreground))" stroke="hsl(var(--primary))" strokeWidth="2.5"/>
        <text x="600" y="395" textAnchor="middle" fill="hsl(var(--primary))" fontSize="24" fontWeight="700">AI Core</text>
        <text x="600" y="420" textAnchor="middle" fill="hsl(var(--primary))" fontSize="13" style={{ opacity: 0.8 }}>Intent → Plan → Actions → Review</text>
        <text x="600" y="444" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">(Multi-step Copilot • Text-to-Action Chains)</text>
      </g>

      {/* Services around core */}
      {[
        { x: 330, y: 260, w: 180, h: 70, title: 'Projects Library', desc: 'per market (city/dev focus)', line: { x1: 420, y1: 330, x2: 560, y2: 360 } },
        { x: 690, y: 260, w: 180, h: 70, title: 'Brand Kit', desc: 'logo • colors • contacts', line: { x1: 640, y1: 360, x2: 780, y2: 330 } },
        { x: 260, y: 470, w: 210, h: 80, title: 'Creative Tools', desc: 'PDF Rebrand • Social • Reels • Landing', line: { x1: 470, y1: 500, x2: 530, y2: 450 } },
        { x: 730, y: 470, w: 210, h: 80, title: 'Ads Manager', desc: 'Ad Creator • Precision • Copilots', line: { x1: 670, y1: 450, x2: 730, y2: 500 } },
        { x: 500, y: 520, w: 200, h: 80, title: 'Comms & Outreach', desc: 'Email • WhatsApp • IG Bot', line: { x1: 600, y1: 510, x2: 600, y2: 458 } }
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="12" fill="hsl(var(--card))" stroke="hsl(var(--border))"/>
          <text x={s.x + s.w/2} y={s.y + s.h/2 - 5} textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14" fontWeight="600">{s.title}</text>
          <text x={s.x + s.w/2} y={s.y + s.h/2 + 13} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">{s.desc}</text>
          <line x1={s.line.x1} y1={s.line.y1} x2={s.line.x2} y2={s.line.y2} stroke="hsl(var(--border))" strokeWidth="1.5"/>
        </g>
      ))}

      {/* Data & Jobs */}
      <g>
        <rect x="140" y="650" width="440" height="90" rx="14" fill="hsl(var(--card))" stroke="hsl(var(--border))"/>
        <text x="360" y="685" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="15" fontWeight="600">Data Layer (Firestore • Storage)</text>
        <text x="360" y="706" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">users • projects_catalog • projects_library • events • drafts</text>

        <rect x="620" y="650" width="440" height="90" rx="14" fill="hsl(var(--card))" stroke="hsl(var(--border))"/>
        <text x="840" y="685" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="15" fontWeight="600">Background Jobs (Cloud Functions)</text>
        <text x="840" y="706" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">generate library • sync brand • schedule chains • integrations</text>

        <line x1="365" y1="650" x2="365" y2="555" stroke="hsl(var(--border))" strokeWidth="1"/>
        <line x1="600" y1="650" x2="600" y2="600" stroke="hsl(var(--border))" strokeWidth="1"/>
        <line x1="835" y1="650" x2="835" y2="555" stroke="hsl(var(--border))" strokeWidth="1"/>
      </g>

      {/* UI → AI Core arrow */}
      <g stroke="hsl(var(--accent))" strokeWidth="2">
        <line x1="600" y1="190" x2="600" y2="280"/>
        <polygon points="600,280 594,268 606,268" fill="hsl(var(--accent))"/>
      </g>
    </svg>
  );
}
