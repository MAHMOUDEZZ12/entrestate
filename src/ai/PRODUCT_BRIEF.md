# Entrestate - Product & Technical Brief (AI Brain)

This document outlines the core vision, data sources, and technical capabilities of the Entrestate platform. It serves as the primary training and reference material for all AI-driven development.

## 1. Core Product Vision: The "Entrestate" Real Estate Engine

Entrestate is architected to be more than just a collection of tools; it is an **intelligent, end-to-end real estate market intelligence engine**.

Our primary mission is to build a sophisticated system that can ingest, analyze, and act upon a vast range of real estate data, as outlined in the `DATA_INGESTION_POLICY.yml`. While this engine will power the Entrestate application for individual agents and brokerages, the core technology is designed to be productized as a standalone **SaaS offering**.

### Core Product Pillars

Our ecosystem is built on three interconnected product pillars that form the foundation of our AI-native platform. These pillars represent the "brain" of the system.

#### 1. Market Search Engine: The Triple Engine of Discovery
-   **Vision & DNA**: Redefines search by combining three engines into one: Fast Search (keyword), Smart Search (semantic AI), and Deep Search (historical & predictive). It extends beyond listings into trends, history, and opportunity discovery.
-   **Current State**: The platform simulates this with the `/me/discover` page. It uses basic keyword filtering for "Fast Search" and provides mock results for "Smart" and "Deep" searches to illustrate the concept.
-   **Future Plan**:
    -   **Fast Search**: Will be powered by a dedicated search service like Elasticsearch or Algolia, indexed from our `projects_catalog`.
    -   **Smart Search**: Will use Gemini to interpret natural language queries (e.g., "villas with a private pool under AED 5M near a good school") and translate them into structured database queries. This will be powered by our embeddings pipeline.
    -   **Deep Search**: Will use AI models trained on historical data from the `Developer Archive` and our Knowledge Graph to answer predictive questions (e.g., "which off-plan projects have the highest potential ROI?").

#### 2. SalesAgentChat AI: The Conversational Frontline
-   **Vision & DNA**: Unifies all communication into a single, intelligent, and commercially productive stream. It engages users proactively, captures intent, and translates conversations into structured data.
-   **Current State**: Implemented as the `AI Assistant` in `/me/assistant`. It can hold a conversation and has access to the user's chat history.
-   **Future Plan**:
    -   **Deepen Integration**: The assistant will be given "tools" (Genkit tools) to directly interact with other platform services. For example, the command "rebrand my brochure" will trigger the `rebrandBrochure` flow directly.
    -   **Proactive Engagement**: The assistant will monitor composite events from our rules engine (`composite_event_rules.json`) and proactively offer suggestions or start workflows.
    -   **Multi-channel Deployment**: The same "brain" will power the embeddable website chatbot and integrations with WhatsApp and Instagram DMs.

#### 3. AI Listing Portal: The Unified Market Registry
-   **Vision & DNA**: Creates a single source of truth for real estate data by consolidating, verifying, and archiving all listings to eliminate noise and enforce accuracy.
-   **Current State**: The concept is represented by the `Market Library` (`/me/tool/projects-finder`) and the `Developer Archive` (`/gem/archive`). The data is currently sourced from mock files and basic scrapers.
-   **Future Plan**:
    -   **Robust Ingestion**: Implement the full `DATA_INGESTION_POLICY.yml` using a dynamically scheduled Airflow DAG (`data-ingestion-dag.py`) controlled by our adaptive scheduler.
    -   **AI Verification & Knowledge Graph**: Use Gemini Vision and our Knowledge Graph (`knowledge_graph_schema.cypher`) to compare listings, flag duplicates, identify false pricing, and calculate a "quality score" for each property.
    -   **Unified API**: Expose the clean, verified data from the Knowledge Graph through an internal API that all other tools (like `Market Reports` and `deal-analyzer`) will use as their source of truth.

## 2. Primary Data Sources & Ingestion

The Entrestate intelligence engine will be trained and continuously updated using the prioritized sources defined in the official `DATA_INGESTION_POLICY.yml`. The ingestion process is managed by an Airflow DAG (`data-ingestion-dag.py`) and dynamically optimized by an **adaptive cadence scheduler** (`adaptive_scheduler.py`), which prioritizes high-value, rapidly changing sources.

## 3. Self-Healing Connectors

To ensure data pipeline reliability, our system implements a self-healing pattern for connectors. Each connector's health is monitored, and if consecutive failures exceed a threshold, the system will:
1.  Attempt to refresh credentials automatically.
2.  Switch to a secondary data source or a cached snapshot.
3.  Trigger an alert for human operations if both fallbacks fail.
This ensures maximum uptime and data freshness.

## 4. User Experience & Visualization Patterns

- **Entity Timeline**: A unified, chronological view for any entity (Project, Developer) showing all associated events: ad campaigns launched, permits filed, news articles published, social media mentions, and mobility data spikes.
- **Composite Alerts Dashboard**: A prioritized queue of AI-detected events (e.g., "New Project Launch Detected," "Reputation Risk Alert"). Each alert is explainable, showing the contributing signals and allowing for user feedback (confirm/dismiss) to retrain the models.
- **Investigation Workspace**: An interactive canvas that combines a Knowledge Graph neighborhood view (showing entities and their relationships up to 2-hops away), a semantic search view (showing similar ad creatives or articles from the vector DB), and a timeline view for deep-dive analysis.

## 5. Enabled APIs & Technical Capabilities

The following Google Cloud APIs are enabled and form the technical backbone of our AI and data processing capabilities.

### Core AI & Machine Learning:
- **Vertex AI API**: The master key for our AI models, pipelines, and workflows.
- **Cloud Natural Language API**: For understanding text, extracting entities, and analyzing sentiment from listings and articles.
- **Cloud Vision API**: For analyzing images from brochures and listings to extract features, text (OCR), and quality metrics.
- **Cloud Speech-to-Text API**: For transcribing audio from video tours or call notes.
- **Cloud Text-to-Speech API**: For generating voiceovers for videos and reports.
- **Cloud Translation API**: For translating brochures and listings into multiple languages.

### Search & Data Infrastructure:
- **Discovery Engine API (Vertex AI Search)**: The core of our Entrestate search product. This will power the "Discover" feature and the standalone search engine.
- **Google Custom Search API**: To be used by scraping and data ingestion tools to find new data sources.
- **Neo4j (AuraDB)**: For housing the canonical Knowledge Graph.

### Orchestration & Infrastructure:
- **Cloud Run API**: For deploying and scaling our services.
- **Cloud Build API**: For automating the build and deployment pipeline.
- **Cloud Functions API**: For running serverless, event-driven tasks (e.g., processing a newly uploaded brochure).
- **Cloud Pub/Sub API**: The event bus connecting all parts of our system, allowing services to communicate asynchronously.
- **Cloud Scheduler API**: For running periodic tasks, such as our adaptive cadence controller.
- **Cloud Workflows API**: For orchestrating complex, multi-step AI processes.

### External Service Integrations:
- **Dialogflow API**: The foundation for our future conversational chatbot gate and advanced AI assistant capabilities.
- **Aerial View API**: To be used by our "Drone Shot Generator" tool to create realistic, cinematic videos of properties.
- **Airflow (Composer)**: For managing the data ingestion DAGs.
