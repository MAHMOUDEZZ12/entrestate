// Entrestate Knowledge Graph - Schema & Bootstrap
// Language: Cypher (for Neo4j)

// 1. Constraints for Unique Identifiers
// Ensures that each core entity has a unique ID, preventing duplicates.
CREATE CONSTRAINT dev_id IF NOT EXISTS FOR (d:Developer) REQUIRE d.dev_id IS UNIQUE;
CREATE CONSTRAINT proj_id IF NOT EXISTS FOR (p:Project) REQUIRE p.project_id IS UNIQUE;
CREATE CONSTRAINT domain_name IF NOT EXISTS FOR (x:Domain) REQUIRE x.name IS UNIQUE;
CREATE CONSTRAINT broker_id IF NOT EXISTS FOR (b:Broker) REQUIRE b.broker_id IS UNIQUE;
CREATE CONSTRAINT permit_id IF NOT EXISTS FOR (p:Permit) REQUIRE p.permit_id IS UNIQUE;

// 2. Example Node Structure (for documentation)
/*
Nodes will have the following general structure:

(:Developer {
    dev_id: "emaar-properties",
    name: "Emaar Properties",
    aliases: ["Emaar"],
    first_seen: timestamp(),
    last_seen: timestamp(),
    confidence: 0.95
})

(:Project {
    project_id: "emaar-beachfront",
    name: "Emaar Beachfront",
    first_seen: timestamp(),
    last_seen: timestamp(),
    confidence: 0.9
})
*/

// 3. Upsert Helper & Relationship Creation (Example Cypher Ingestion Query)
// This pattern is used by the enrichment worker to add data to the graph.
// It uses MERGE to either create a new node or update an existing one.

// Example Payload (passed as a parameter `$payload`):
/*
{
  "project_id": "emaar-beachfront",
  "project_name": "Emaar Beachfront",
  "developer_id": "emaar-properties",
  "developer_name": "Emaar Properties",
  "confidence": 0.8,
  "provenance": {
    "source": "bayut_listings",
    "source_doc_id": "bayut-12345",
    "raw_data_url": "s3://ingest-bucket/raw/bayut/12345.json",
    "observed_at": timestamp()
  }
}
*/

WITH $payload AS payload
// Upsert the Project node
MERGE (proj:Project {project_id: payload.project_id})
ON CREATE SET proj.name = payload.project_name, proj.first_seen = timestamp(), proj.last_seen = timestamp()
ON MATCH SET proj.last_seen = timestamp()

// Upsert the Developer node
MERGE (dev:Developer {dev_id: payload.developer_id})
ON CREATE SET dev.name = payload.developer_name, dev.first_seen = timestamp(), dev.last_seen = timestamp()
ON MATCH SET dev.last_seen = timestamp()

// Create the relationship between them
MERGE (dev)-[r:DEVELOPS]->(proj)

// Add provenance information to the relationship, creating a rich audit trail
// This is the key to an explainable AI system.
SET r.last_seen = payload.provenance.observed_at,
    r.confidence = coalesce(r.confidence, 0) + payload.confidence
MERGE (r)-[:SEEN_IN]->(evidence:Evidence {source: payload.provenance.source, source_doc_id: payload.provenance.source_doc_id})
ON CREATE SET evidence.raw_data_url = payload.provenance.raw_data_url, evidence.observed_at = payload.provenance.observed_at


    