# Entrestate Internal Documentation

## Overview
Entrestate is a **real estate–focused AI productivity hub**.  
It connects **projects, brands, storage, and sales tools** into one unified system that empowers agents to create, manage, and sell faster.  

The system is built on a **modular architecture**: each feature is an AI-driven "Service Card" that plugs into a shared core (auth, storage, brand kit, project library). The complete technical vision is outlined in `src/ai/PRODUCT_BRIEF.md`.

---

## Core Concepts
- **Projects** → AI-curated library, stored per user in Firestore (`users/{uid}/projects`).
- **Brand Kit** → Logos, colors, contact info applied across tools, stored in `users/{uid}`.
- **Storage** → Central bucket for uploads, connected to projects and outputs.
- **Service Cards** → Independent AI-powered tools, defined in `src/lib/tools-client.tsx`, each powered by a Genkit flow.
- **AI Co-Pilot** → The central assistant that guides workflows, connects data, and suggests next steps.

---

## Core Features (Service Cards)
- Insta Ad Creation  
- Automated Rebranding  
- PDF Smart Editor  
- Landing Page Generator  
- Social Post Writer  
- Listing Details Generator  
- Email Marketing Creator  
- AI Story Designer  
- AI Reel Designer  
- TikTok Video Editor  
- Precision Targeting  
- WhatsApp Campaign Manager  
- CRM Memory Assistant  
- Investor Matching  
- Market Trend Reports  

(Each service runs as a card in `/dashboard/marketing` and connects back to **Projects + Brand + Storage**).  

---

## Data Model (Firestore)

`users/{uid}`
  - `profile: { name, city, email }`
  - `brandKit: { logoUrl, colors:{primary,accent}, contact:{phone,email} }`
  - `projects (subcollection)`
    - `projects/{projectId}`
      - `name, developer, city, priceFrom, unitTypes[], handover`
  - `knowledgeBase (subcollection)`
      - `files/{fileId}`
          - `fileName, fileUrl, type, status, summary`

`projects_catalog/{projectId}`
  - `name, developer, city, priceFrom, unitTypes[], handover` (Public, searchable library)

`events/{eventId}`
  - `event, uid, props, ts` (For analytics and AI training)

`xmlImports/{importId}`
  - `type, fileName, storagePath, ownerUid, status, preview, createdAt`

---

## Key Flows
### Onboarding

1. Auto-detect location (via cookies/IP).
2. User selects key developers, which seeds their initial project library.
3. User adds their Brand Kit (logo, colors, contact).
4. User connects external accounts (Meta, WhatsApp, etc.).
5. User lands in `/dashboard`, ready to use the tools.

### Service Use (Generic Flow)

1. User opens a tool from the `/dashboard/marketing` page.
2. The UI in `/dashboard/tool/[toolId]` renders the form based on `tools-client.tsx`.
3. User fills out the form and submits.
4. The request is sent to the `/api/run` endpoint.
5. The endpoint maps the `toolId` to the correct Genkit flow in `src/ai/flows`.
6. The Genkit flow executes (calling the Gemini API).
7. The result is returned to the UI and rendered by the tool's `renderResult` function.

### AI Co-Pilot

- Observes user actions via the `events` collection.
- Suggests next tools (“You edited a brochure → want to generate an ad?”).
- Guides onboarding for new users.

---

## APIs / Integrations

- **Google Cloud / Firebase** → Auth, Firestore, Storage, Hosting, Cloud Functions.
- **Meta / TikTok / Google Ads APIs** → For campaign deployment via Pilots.
- **Gemini API (Google AI)** → For all generative AI capabilities via Genkit.
- **Twilio / WhatsApp Business API** → Comms integration.
- **PayPal API** → For transaction lookups and future payments.

---

## Deployment

- **Framework**: Next.js + Tailwind CSS
- **Hosting**: Firebase App Hosting (preferred) or Vercel
- **Database**: Firestore
- **Storage**: Firebase Storage
- **Auth**: Firebase Auth
