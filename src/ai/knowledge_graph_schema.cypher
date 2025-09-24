# Canonical Knowledge Graph Schema for Entrestate v2.0
# This schema defines the core nodes and relationships for the real estate market graph.

# --- NODES ---

# 1. Core Real Estate Entities
CREATE CONSTRAINT ON (p:Project) ASSERT p.id IS UNIQUE;
CREATE CONSTRAINT ON (d:Developer) ASSERT d.id IS UNIQUE;
CREATE CONSTRAINT ON (c:Company) ASSERT c.id IS UNIQUE; # General company node
CREATE CONSTRAINT ON (b:Brokerage) ASSERT b.id IS UNIQUE;
CREATE CONSTRAINT ON (a:Agent) ASSERT a.id IS UNIQUE;
CREATE CONSTRAINT ON (l:Listing) ASSERT l.id IS UNIQUE;

# 2. Location & Administrative Entities
CREATE CONSTRAINT ON (n:Neighborhood) ASSERT n.name IS UNIQUE;
CREATE CONSTRAINT ON (c:City) ASSERT c.name IS UNIQUE;
CREATE CONSTRAINT ON (r:Region) ASSERT r.name IS UNIQUE; # e.g., Emirate, State
CREATE CONSTRAINT ON (cty:Country) ASSERT cty.code IS UNIQUE;
CREATE CONSTRAINT ON (g:GovBody) ASSERT g.id IS UNIQUE; # e.g., DLD, RERA

# 3. Market & Content Entities
CREATE CONSTRAINT ON (m:Media) ASSERT m.url IS UNIQUE; # News articles, press releases
CREATE CONSTRAINT ON (s:SocialPost) ASSERT s.url IS UNIQUE;
CREATE CONSTRAINT ON (ad:AdCreative) ASSERT ad.id IS UNIQUE;
CREATE CONSTRAINT ON (camp:Campaign) ASSERT camp.id IS UNIQUE;
CREATE CONSTRAINT ON (k:Keyword) ASSERT k.text IS UNIQUE;
CREATE CONSTRAINT ON (rev:Review) ASSERT rev.id IS UNIQUE;

# 4. People & Contacts
CREATE CONSTRAINT ON (p:Person) ASSERT p.id IS UNIQUE; # General person, investor, etc.
CREATE CONSTRAINT ON (con:Contact) ASSERT con.id IS UNIQUE; # Phone, email

# --- INDEXES (for performance) ---
CREATE INDEX FOR (p:Project) ON (p.name);
CREATE INDEX FOR (d:Developer) ON (d.name);
CREATE INDEX FOR (l:Listing) ON (l.status);
CREATE INDEX FOR (ad:AdCreative) ON (ad.platform);

# --- RELATIONSHIPS ---

# Project & Company Relationships
MATCH (p:Project), (d:Developer) WHERE p.developer_id = d.id CREATE (d)-[:DEVELOPS]->(p);
MATCH (p:Project), (b:Brokerage) WHERE b.id IN p.brokerage_ids CREATE (b)-[:MARKETS]->(p);
MATCH (l:Listing), (p:Project) WHERE l.project_id = p.id CREATE (l)-[:IS_LISTING_FOR]->(p);
MATCH (a:Agent), (b:Brokerage) WHERE a.brokerage_id = b.id CREATE (a)-[:WORKS_FOR]->(b);
MATCH (a:Agent), (l:Listing) WHERE a.id = l.agent_id CREATE (a)-[:MANAGES_LISTING]->(l);
MATCH (p:Person), (d:Developer) WHERE p.id = d.ceo_id CREATE (p)-[:IS_CEO_OF]->(d);

# Location Relationships
MATCH (p:Project), (n:Neighborhood) WHERE p.neighborhood = n.name CREATE (p)-[:LOCATED_IN]->(n);
MATCH (n:Neighborhood), (c:City) WHERE n.city = c.name CREATE (n)-[:IS_PART_OF]->(c);
MATCH (c:City), (r:Region) WHERE c.region = r.name CREATE (c)-[:IS_PART_OF]->(r);
MATCH (r:Region), (cty:Country) WHERE r.country_code = cty.code CREATE (r)-[:IS_PART_OF]->(cty);

# Market & Content Relationships
MATCH (camp:Campaign), (d:Developer) WHERE camp.advertiser_id = d.id CREATE (d)-[:RUNS]->(camp);
MATCH (ad:AdCreative), (camp:Campaign) WHERE ad.campaign_id = camp.id CREATE (ad)-[:BELONGS_TO]->(camp);
MATCH (ad:AdCreative), (l:Listing) WHERE ad.listing_id = l.id CREATE (ad)-[:PROMOTES]->(l);
MATCH (ad:AdCreative), (k:Keyword) WHERE k.text IN ad.keywords CREATE (ad)-[:TARGETS_KEYWORD]->(k);
MATCH (m:Media), (p:Project) WHERE m.mentions_project_id = p.id CREATE (m)-[:MENTIONS]->(p);
MATCH (s:SocialPost), (p:Project) WHERE s.mentions_project_id = p.id CREATE (s)-[:MENTIONS]->(p);
MATCH (rev:Review), (p:Project) WHERE rev.project_id = p.id CREATE (rev)-[:IS_REVIEW_OF]->(p);
MATCH (rev:Review), (d:Developer) WHERE rev.developer_id = d.id CREATE (rev)-[:IS_REVIEW_OF]->(d);

# People & Contact Relationships
MATCH (p:Person), (con:Contact) WHERE con.person_id = p.id CREATE (p)-[:HAS_CONTACT]->(con);
MATCH (p1:Person), (p2:Person) WHERE p1.knows_person_id = p2.id CREATE (p1)-[:KNOWS]->(p2);
MATCH (p:Person), (l:Listing) WHERE p.id = l.buyer_id CREATE (p)-[:BOUGHT]->(l);
MATCH (p:Person), (l:Listing) WHERE p.id = l.seller_id CREATE (p)-[:SOLD]->(l);
