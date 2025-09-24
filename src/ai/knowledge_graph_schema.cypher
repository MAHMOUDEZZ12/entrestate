// Entrestate Knowledge Graph Schema (v2.1)
// Using Cypher for Neo4j

// --- Node Labels ---

// Core Entities
CREATE CONSTRAINT ON (p:Project) ASSERT p.id IS UNIQUE;
CREATE CONSTRAINT ON (d:Developer) ASSERT d.name IS UNIQUE;
CREATE CONSTRAINT ON (b:Brokerage) ASSERT b.name IS UNIQUE;
CREATE CONSTRAINT ON (a:Agent) ASSERT a.id IS UNIQUE;
CREATE CONSTRAINT ON (l:Listing) ASSERT l.id IS UNIQUE;

// Location Entities
CREATE CONSTRAINT ON (c:City) ASSERT c.name IS UNIQUE;
CREATE CONSTRAINT ON (n:Neighborhood) ASSERT n.name IS UNIQUE;

// Event & Signal Entities
CREATE CONSTRAINT ON (e:Event) ASSERT e.id IS UNIQUE;
CREATE CONSTRAINT ON (s:Signal) ASSERT s.id IS UNIQUE;
CREATE CONSTRAINT ON (c:Campaign) ASSERT c.id IS UNIQUE;

// --- Indexes for Performance ---

// Create indexes on commonly searched properties
CREATE INDEX FOR (p:Project) ON (p.name);
CREATE INDEX FOR (p:Project) ON (p.status);
CREATE INDEX FOR (d:Developer) ON (d.country);
CREATE INDEX FOR (l:Listing) ON (l.status);
CREATE INDEX FOR (l:Listing) ON (l.price);
CREATE INDEX FOR (e:Event) ON (e.type);
CREATE INDEX FOR (e:Event) ON (e.timestamp);

// --- Relationship Types ---

// Defines the relationships between the nodes in the graph.

// :DEVELOPED_BY (Project)-[:DEVELOPED_BY]->(Developer)
// :HAS_LISTING (Project)-[:HAS_LISTING]->(Listing)
// :LISTED_BY (Listing)-[:LISTED_BY]->(Agent)
// :WORKS_FOR (Agent)-[:WORKS_FOR]->(Brokerage)
// :LOCATED_IN (Project)-[:LOCATED_IN]->(Neighborhood)
// :IN_CITY (Neighborhood)-[:IN_CITY]->(City)
// :RAN_CAMPAIGN (Developer)-[:RAN_CAMPAIGN]->(Campaign)
// :TARGETS (Campaign)-[:TARGETS]->(Project)
// :TRIGGERED_EVENT (Campaign)-[:TRIGGERED_EVENT]->(Event)
// :CONTRIBUTED_TO (Signal)-[:CONTRIBUTED_TO]->(Event)

// --- Example Node Properties ---

/*
Project {
  id: "emaar-beachfront-1",
  name: "Emaar Beachfront",
  status: "Ready",
  launch_date: "2018-01-15",
  expected_handover: "2022-12-31"
}

Developer {
  name: "Emaar Properties",
  country: "UAE",
  reputation_score: 9.5
}

Listing {
  id: "pf-12345",
  source: "Property Finder",
  price: 2500000,
  currency: "AED",
  status: "Active",
  created_at: "2024-07-20T10:00:00Z"
}

Event {
  id: "evt-abc-123",
  type: "new_project_high_confidence_launch",
  timestamp: "2024-07-25T12:00:00Z",
  confidence: 0.98,
  summary: "High confidence launch detected for 'Maritime City' by 'Nakheel'."
}

Signal {
  id: "sig-xyz-789",
  type: "ad_push",
  source: "Meta Ads API",
  timestamp: "2024-07-25T11:30:00Z",
  value: 50000 // e.g., ad spend
}
*/
