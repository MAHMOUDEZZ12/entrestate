// Entrestate Knowledge Graph - Schema & Bootstrap
// This file defines the constraints and basic ingestion patterns for our Neo4j graph.

// -----------------------------------------------------------------------------
// 1. CONSTRAINTS - Enforce uniqueness for primary entities
// -----------------------------------------------------------------------------
CREATE CONSTRAINT dev_id IF NOT EXISTS FOR (d:Developer) REQUIRE d.dev_id IS UNIQUE;
CREATE CONSTRAINT proj_id IF NOT EXISTS FOR (p:Project) REQUIRE p.project_id IS UNIQUE;
CREATE CONSTRAINT domain_name IF NOT EXISTS FOR (x:Domain) REQUIRE x.name IS UNIQUE;
CREATE CONSTRAINT broker_id IF NOT EXISTS FOR (b:Broker) REQUIRE b.broker_id IS UNIQUE;
CREATE CONSTRAINT listing_id IF NOT EXISTS FOR (l:Listing) REQUIRE l.listing_id IS UNIQUE;
CREATE CONSTRAINT campaign_id IF NOT EXISTS FOR (c:Campaign) REQUIRE c.campaign_id IS UNIQUE;
CREATE CONSTRAINT ad_creative_id IF NOT EXISTS FOR (a:AdCreative) REQUIRE a.creative_id IS UNIQUE;
CREATE CONSTRAINT permit_id IF NOT EXISTS FOR (pe:Permit) REQUIRE pe.permit_id IS UNIQUE;
CREATE CONSTRAINT event_id IF NOT EXISTS FOR (e:Event) REQUIRE e.event_id IS UNIQUE;


// -----------------------------------------------------------------------------
// 2. INDEXES - For faster lookups on non-unique properties
// -----------------------------------------------------------------------------
CREATE INDEX dev_name IF NOT EXISTS FOR (d:Developer) ON (d.name);
CREATE INDEX proj_name IF NOT EXISTS FOR (p:Project) ON (p.name);
CREATE INDEX listing_status IF NOT EXISTS FOR (l:Listing) ON (l.status);


// -----------------------------------------------------------------------------
// 3. INGESTION PATTERNS - Example Cypher for upserting nodes and relationships
// These are parameterized queries to be used by the data processing pipeline.
// -----------------------------------------------------------------------------

// Example 1: Upsert a Developer
/*
@param $dev_id: Unique ID for the developer
@param $name: Developer's name
@param $confidence: Confidence score of the source data
*/
MERGE (d:Developer {dev_id: $dev_id})
ON CREATE SET d.name = $name, d.first_seen = timestamp(), d.confidence = $confidence, d.last_seen = timestamp()
ON MATCH SET d.name = $name, d.last_seen = timestamp(), d.confidence = coalesce(d.confidence, 0) + $confidence;


// Example 2: Ingest a Project and link it to its Developer
/*
@param $payload: An object containing project and developer details
  - $payload.project_id
  - $payload.project_name
  - $payload.developer_id
  - $payload.developer_name
  - $payload.source_name: e.g., 'bayut_scrape'
  - $payload.source_url: Link to the raw data blob
  - $payload.confidence
*/
WITH $payload AS payload
MERGE (proj:Project {project_id: payload.project_id})
ON CREATE SET proj.name = payload.project_name, proj.first_seen = timestamp()

MERGE (dev:Developer {dev_id: payload.developer_id})
ON CREATE SET dev.name = payload.developer_name, dev.first_seen = timestamp()

MERGE (dev)-[r:DEVELOPS]->(proj)
ON CREATE SET r.first_seen = timestamp()
SET r.last_seen = timestamp(), r.confidence = coalesce(r.confidence, 0) + payload.confidence

// Add provenance to the relationship
MERGE (dev)-[r_prov:DEVELOPS]->(proj)
CREATE (ev:Evidence {source: payload.source_name, url: payload.source_url, timestamp: timestamp()})
MERGE (r_prov)-[:HAS_EVIDENCE]->(ev);


// Example 3: Link a new AdCreative to a Campaign and a Project
/*
@param $payload:
  - $payload.creative_id
  - $payload.campaign_id
  - $payload.project_id
  - $payload.source_name
*/
WITH $payload as payload
MERGE (ad:AdCreative {creative_id: payload.creative_id})
MERGE (camp:Campaign {campaign_id: payload.campaign_id})
MERGE (proj:Project {project_id: payload.project_id})

MERGE (ad)<-[:CONTAINS]-(camp)
MERGE (camp)-[:PROMOTES]->(proj);
