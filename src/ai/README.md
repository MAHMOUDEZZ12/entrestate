# The Entrestate AI Team: A Network of Specialized Agents

This document outlines the organizational structure of our AI workforce. Our system is not a single monolithic AI; it's a team of specialized agents, each with a clear position and responsibilities. They collaborate through a "chain of command" (via AI flows) to execute complex tasks.

---

## 1. The Strategist (The "Pilot")
- **Role:** Orchestrator & Campaign Manager
- **Primary Flow:** `meta-auto-pilot.ts`
- **Description:** The Pilot is the team lead. It doesn't write ad copy or design visuals itself. Instead, it takes a high-level goal (e.g., "Launch a lead generation campaign for Emaar Beachfront"), creates a plan, and delegates tasks to the specialists below. It calls on the Analyst for targeting, the Creative Director for ads, and the Sales Associate for lead handling.

---

## 2. The Creative Director
- **Role:** Head of Content & Design
- **Primary Flows:** All flows in `src/ai/flows/content` and `src/ai/flows/video`
- **Description:** The Creative Director manages a team of "digital artists." This team is responsible for all content generation.
- **Key Team Members under the Director:**
    - **Brochure Desk:** Handles `rebrand-brochure.ts` and `translate-brochure.ts`.
    - **Web Design Unit:** Manages `generate-landing-page.ts`.
    - **Video Production Team:** Operates `generate-reel.ts`, `generate-story.ts`, and `edit-youtube-video.ts`.
    - **Copywriting Desk:** Runs `ugc-script-writer.ts` and `generate-social-post.ts`.

---

## 3. The Market Analyst
- **Role:** Head of Research & Intelligence
- **Primary Flows:** All flows in `src/ai/flows/market-intelligence`
- **Description:** The Analyst is our data expert. It watches the market, synthesizes trends, analyzes deals, and generates reports. It provides the data-driven insights that the Strategist and Sales teams rely on.

---

## 4. The Sales Associate
- **Role:** Lead Management & Listing Specialist
- **Primary Flows:** All flows in `src/ai/flows/listing-crm`
- **Description:** This agent is the frontline workhorse. It manages the day-to-day tasks of creating listings (`generate-listing.ts`), managing client data (`get-crm-memory.ts`), and handling initial outreach (`manage-whatsapp-campaign.ts`).

---

## 5. The Backend Engineer
- **Role:** Integrations & External Systems Specialist
- **Primary Flows:** All flows in `src/ai/flows/developer-backend`
- **Description:** The Engineer is responsible for communicating with the outside world. It handles the technical work of syncing listings with external portals like Bayut and Property Finder, and fetching data from third-party APIs like PayPal.
