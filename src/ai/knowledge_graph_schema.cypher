// Entrestate Canonical Knowledge Graph Schema (Neo4j Cypher)

// This file defines the core constraints and an example of the data model
// for the Entrestate Knowledge Graph.

// -------------------------------------------------
// 1. CONSTRAINTS
// Enforce unique IDs for core entities to prevent duplication.
// -------------------------------------------------
CREATE CONSTRAINT dev_id IF NOT EXISTS FOR (d:Developer) REQUIRE d.dev_id IS UNIQUE;
CREATE CONSTRAINT proj_id IF NOT EXISTS FOR (p:Project) REQUIRE p.project_id IS UNIQUE;
CREATE CONSTRAINT broker_id IF NOT EXISTS FOR (b:Broker) REQUIRE b.broker_id IS UNIQUE;
CREATE CONSTRAINT domain_name IF NOT EXISTS FOR (x:Domain) REQUIRE x.name IS UNIQUE;
CREATE CONSTRAINT permit_id IF NOT EXISTS FOR (pe:Permit) REQUIRE pe.permit_id IS UNIQUE;

// -------------------------------------------------
// 2. NODE LABELS & PROPERTIES
// Core entities in the graph.
// -------------------------------------------------
// :Developer { dev_id: string, name: string, aliases: string[], confidence: float }
// :Project { project_id: string, name: string, handover_date: string, status: string }
// :Listing { listing_id: string, price: float, currency: string, status: string }
// :Broker { broker_id: string, name: string, license: string }
// :Campaign { campaign_id: string, platform: string, objective: string }
// :AdCreative { creative_id: string, text: string, image_hash: string }
// :Domain { name: string, first_seen: datetime }
// :Permit { permit_id: string, type: string, status: string, issue_date: datetime }
// :Event { event_id: string, type: string, timestamp: datetime }
// :Evidence { source: string, raw_data_link: string, ingested_at: datetime }


// -------------------------------------------------
// 3. EXAMPLE INGESTION / MERGE FLOW
// This is a pseudo-Cypher block demonstrating how new data is merged
// into the graph, creating nodes and relationships if they don't exist.
// -------------------------------------------------
// Assume `$payload` is a parameter passed from an enrichment worker.
// Example Payload:
// {
//   project_id: "emaar-bhf-t1",
//   project_name: "Emaar Beachfront Tower 1",
//   developer_id: "emaar",
//   developer_name: "Emaar Properties",
//   listing_id: "bayut-12345",
//   price: 2500000,
//   source: "bayut_scrape_v2",
//   raw_link: "s3://raw-ingest/bayut/12345.json"
// }

WITH $payload AS payload

// Upsert the Project node
MERGE (proj:Project {project_id: payload.project_id})
ON CREATE SET
  proj.name = payload.project_name,
  proj.first_seen = timestamp(),
  proj.last_updated = timestamp()
ON MATCH SET
  proj.last_updated = timestamp()

// Upsert the Developer node
MERGE (dev:Developer {dev_id: payload.developer_id})
ON CREATE SET
  dev.name = payload.developer_name,
  dev.first_seen = timestamp()

// Create the relationship between Developer and Project
MERGE (dev)-[:DEVELOPS]->(proj)

// Upsert the Listing node
MERGE (listing:Listing {listing_id: payload.listing_id})
ON CREATE SET
  listing.price = payload.price,
  listing.first_seen = timestamp()
ON MATCH SET
  listing.price = payload.price, // Update price if it changes
  listing.last_seen = timestamp()

// Link the Listing to the Project
MERGE (listing)-[:IS_FOR]->(proj)

// Create an Evidence node and link it to the relationships
// This provides provenance for the data connections.
CREATE (evidence:Evidence {
  source: payload.source,
  raw_data_link: payload.raw_link,
  ingested_at: timestamp()
})
MERGE (listing)-[:HAS_EVIDENCE]->(evidence)
MERGE (dev)-[:HAS_EVIDENCE]->(evidence);
