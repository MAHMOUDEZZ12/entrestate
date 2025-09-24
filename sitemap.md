
# Entrestate Platform Sitemap

This document outlines the complete sitemap and page hierarchy for the Entrestate application. It is divided into three main sections: the public-facing domain, the authenticated user workspace, and the internal developer/admin section.

---

## 1. Public Domain (Marketing & Information)

This is the public "storefront" for Entrestate, designed for discovery, education, and user acquisition. All pages here are publicly accessible and indexed by search engines.

-   **Home (`/`)**
-   **Marketplace (`/marketplace`)**
    -   A public showcase of all available AI apps and solutions.
    -   Each app card links to its detailed blog page (e.g., `/blog/meta-auto-pilot`).
-   **Pricing (`/pricing`)**
    -   Displays the available subscription plans and their features.
-   **Solutions (`/solutions`)**
    -   A hub page for our core, high-level product offerings.
    -   **Solution Detail (`/solutions/[slug]`)**
        -   In-depth pages for each core product.
        -   _Example:_ `/solutions/pro-search-eng-x3` (Market Search Engine)
-   **Blog (`/blog`)**
    -   A list of all articles and deep dives into our tools.
    -   **Blog Post (`/blog/[slug]`)**
        -   A detailed page for each specific app/tool.
        -   _Example:_ `/blog/insta-ads-designer`
-   **Flow Library (`/resources/flows`)**
    -   A collection of pre-built automation workflows that users can adopt.
-   **Market Pulse (`/market`)**
    -   Public-facing dashboard with high-level market data and trends.
-   **Technology (`/technology`)**
    -   An overview of the AI and cloud technology powering the platform.
-   **About Us (`/about`)**
    -   Information about the company and its mission.
-   **Support (`/support`)**
    -   The central hub for user support, including access to the AI Support Agent.
-   **System Status (`/status`)**
    -   A real-time status page for all platform services.
-   **Documentation (`/documentation`)**
    -   Technical documentation for developers and advanced users.
-   **SuperFreeTime (`/superfreetime`)**
    -   A special promotional or feature page.
-   **Legal & Compliance**
    -   [Privacy Policy (`/privacy`)
    -   [Terms of Service (`/terms`)
    -   [Cookie Policy (`/cookies`)

---

## 2. Authenticated Workspace (`/me`)

This is the secure, operational hub for logged-in users. Access to these pages is restricted.

-   **Workspace Home (`/me`)**
    -   The main dashboard, showing a user's feed, projects, and apps.
-   **Discovery Search (`/me/discover`)**
    -   The entry point to the intelligent, multi-engine search.
-   **Studio**
    -   **Marketplace (`/me/marketing`)**: A user's private App Store to add/remove tools.
    -   **Flow Builder (`/me/flows`)**: Interface for creating and managing multi-step automations.
    -   **Brand & Assets (`/me/brand`)**: Manage brand identity and the AI's Knowledge Base.
-   **AI Assistant (`/me/assistant`)**
    -   The central AI command center and chat interface.
-   **Leads (CRM) (`/me/leads`)**
    -   Client Relationship Management dashboard.
-   **Client Pages (`/me/clients`)**
    -   Manage dedicated portal pages for individual clients.
-   **Contacts Directory (`/me/directory`)**
    -   A private directory of key developer and agent contacts.
-   **Tool Execution Pages (`/me/tool/[toolId]`)**
    -   The individual pages where each AI tool is configured and run.
    -   _Example:_ `/me/tool/listing-generator`
    -   _Example:_ `/me/tool/meta-auto-pilot`
-   **Settings (`/me/settings`)**
    -   User account, appearance, and subscription management.

---

## 3. Developer & Admin Section (`/gem`)

This is the internal command center for monitoring, managing, and developing the Entrestate ecosystem. Access is restricted to admin-level users.

-   **Gem Dashboard (`/gem`)**
    -   The main entry point for all administrative tools.
-   **System Health (`/gem/system-health`)**
    -   Monitors the operational status of all services and AI models.
-   **Developer Archive (`/gem/archive`)**
    -   The historical database ("source of truth") for developer and project data.
-   **Sitemap (`/gem/sitemap`)**
    -   A visual representation of all application routes.
-   **Data Importer (`/gem/data-importer`)**
    -   Tools for importing external data (e.g., XML feeds).
-   **API Keys & Status (`/gem/keys`)**
    -   A centralized dashboard to monitor the status of all external API connections.
