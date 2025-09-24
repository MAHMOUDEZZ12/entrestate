
// Entrestate Knowledge Graph Schema (Neo4j)

// This file defines the canonical schema and bootstrap constraints for the Neo4j Knowledge Graph.
// It is the source of truth for all graph data modeling.

// =================================================================
// 1. CONSTRAINTS - Enforce unique IDs for primary entity nodes
// =================================================================

CREATE CONSTRAINT dev_id IF NOT EXISTS FOR (d:Developer) REQUIRE d.dev_id IS UNIQUE;
CREATE CONSTRAINT proj_id IF NOT EXISTS FOR (p:Project) REQUIRE p.project_id IS UNIQUE;
CREATE CONSTRAINT broker_id IF NOT EXISTS FOR (b:Broker) REQUIRE b.broker_id IS UNIQUE;
CREATE CONSTRAINT listing_id IF NOT EXISTS FOR (l:Listing) REQUIRE l.listing_id IS UNIQUE;
CREATE CONSTRAINT campaign_id IF NOT EXISTS FOR (c:Campaign) REQUIRE c.campaign_id IS UNIQUE;
CREATE CONSTRAINT creative_id IF NOT EXISTS FOR (a:AdCreative) REQUIRE a.creative_id IS UNIQUE;
CREATE CONSTRAINT permit_id IF NOT EXISTS FOR (t:Permit) REQUIRE t.permit_id IS UNIQUE;
CREATE CONSTRAINT domain_name IF NOT EXISTS FOR (x:Domain) REQUIRE x.name IS UNIQUE;
CREATE CONSTRAINT event_id IF NOT EXISTS FOR (e:Event) REQUIRE e.event_id IS UNIQUE;


// =================================================================
// 2. BOOTSTRAP CYPHER - Example ingestion and relationship linking
// =================================================================

// --- Upsert Helpers ---

// Upsert a Developer node with confidence tracking
// Params: $dev_id, $name, $confidence
MERGE (d:Developer {dev_id: $dev_id})
ON CREATE SET d.name = $name, d.first_seen = timestamp(), d.confidence = $confidence, d.last_seen = timestamp()
ON MATCH SET d.last_seen = timestamp(), d.confidence = coalesce(d.confidence, 0) + $confidence;

// Upsert a Project node
// Params: $project_id, $name
MERGE (p:Project {project_id: $project_id})
ON CREATE SET p.name = $name, p.first_seen = timestamp(), p.last_seen = timestamp();


// --- Example Ingestion Flow (from a single listing payload) ---
// This demonstrates how a raw payload would be used to create/update the graph.

WITH {
    project_id: 'proj-emaar-beachfront-123',
    project_name: 'Emaar Beachfront',
    developer_id: 'dev-emaar',
    developer_name: 'Emaar Properties',
    listing_id: 'list-pf-98765',
    listing_url: 'https://www.propertyfinder.ae/en/buy/...',
    source: 'propertyfinder.ae',
    confidence: 1.0
} AS payload

// 1. Upsert the Project and Developer nodes
MERGE (proj:Project {project_id: payload.project_id})
ON CREATE SET proj.name = payload.project_name, proj.first_seen = timestamp(), proj.last_seen = timestamp()
ON MATCH SET proj.last_seen = timestamp()

MERGE (dev:Developer {dev_id: payload.developer_id})
ON CREATE SET dev.name = payload.developer_name, dev.first_seen = timestamp(), dev.last_seen = timestamp()
ON MATCH SET dev.last_seen = timestamp()

// 2. Create the relationship between them
MERGE (dev)-[r:DEVELOPS]->(proj)
ON CREATE SET r.first_seen = timestamp()
SET r.last_seen = timestamp(),
    r.confidence = coalesce(r.confidence, 0) + payload.confidence

// 3. Create the Listing node and link it to the Project
MERGE (listing:Listing {listing_id: payload.listing_id})
ON CREATE SET listing.url = payload.listing_url, listing.first_seen = timestamp(), listing.last_seen = timestamp()
ON MATCH SET listing.last_seen = timestamp()

MERGE (listing)-[:PART_OF]->(proj)

// 4. Create an Evidence node to record the source of this information
CREATE (evidence:Evidence { source: payload.source, timestamp: timestamp(), raw_data_link: 's3://path/to/raw/blob.json' })
CREATE (listing)-[:HAS_EVIDENCE]->(evidence)
CREATE (dev)-[:HAS_EVIDENCE]->(evidence)
CREATE (proj)-[:HAS_EVIDENCE]->(evidence);
